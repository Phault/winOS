import React, {
  FC,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  HTMLProps,
  useReducer,
  useLayoutEffect,
  RefObject,
  MutableRefObject,
  useImperativeHandle,
  Ref,
  CSSProperties,
  createRef,
} from 'react';
import { OSContext } from '../../App';
import * as nodePath from 'bfs-path';
import styled from 'styled-components/macro';
import { WindowContext } from '../../windows/WindowManager';
import { Icon } from '../../widgets/Icon';
import * as assets from './assets';
import { HotKeys } from 'react-hotkeys';
import { mod } from '../../misc/mod';
import { getMimeType } from '../../misc/io/getMimeType';
import { useDirectory } from '../../misc/hooks/useDirectory';
import { useFile } from '../../misc/hooks/useFile';
import { useObjectUrl } from '../../misc/hooks/useObjectUrl';
import { Size } from '../../misc/Size';
import { Toolbar } from './Toolbar';
import { Separator } from './Separator';
import { Button } from './Button';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { Preview } from './Preview';
import { rotateImage } from './rotateImage';
import { preventDefaultAll } from '../../misc/preventDefaultAll';

export interface PictureViewerProps {
  initialPath: string;
}

const StyledPictureViewer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eef2fb;
`;

function calculateBestFitZoom(imageSize: Size, containerSize: Size) {
  return Math.min(
    1,
    containerSize.width / imageSize.width,
    containerSize.height / imageSize.height
  );
}

const supportedFileTypes = /\.(png|gif|bmp|jpe?g|tiff?)$/;

function writeImage(dataWriter: (data: Buffer) => void, dataUrl: string) {
  const data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = new Buffer(data, 'base64');
  dataWriter(buffer);
}

export const PictureViewer: FC<PictureViewerProps> = ({ initialPath }) => {
  const { fileSystem } = useContext(OSContext)!;
  const window = useContext(WindowContext)!;

  const [path, setPath] = useState(initialPath);
  const [data, writeData] = useFile(fileSystem, path);
  const url = useObjectUrl(data, getMimeType(path));

  useEffect(() => {
    const name = nodePath.basename(path);
    window.title = `${name} - ${window.template.title}`;
  }, [path]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [imageSize, setImageSize] = useState<Size>({ width: 0, height: 0 });
  const [zoom, setZoom] = useState<'auto' | number>('auto');

  const setZoomClamped = useCallback(
    (zoom: number) => {
      const containerSize = containerRef.current
        ? containerRef.current.getBoundingClientRect()
        : { width: 0, height: 0 };
      const minZoom = calculateBestFitZoom(imageSize, containerSize);

      if (zoom <= minZoom) setZoom('auto');
      else {
        const newValue = Math.min(zoom, 2);
        setZoom(newValue);
      }
    },
    [setZoom, imageSize.width, imageSize.height, containerRef]
  );

  const dir = useDirectory(fileSystem, nodePath.dirname(path), f =>
    supportedFileTypes.test(f)
  );

  const cycleImages = useCallback(
    (offset: number) => {
      const index = dir.indexOf(nodePath.basename(path));
      const newIndex = mod(index + offset, dir.length);
      setPath(nodePath.join(nodePath.dirname(path), dir[newIndex]));
      setZoom('auto');
    },
    [dir, path, setPath, setZoom]
  );

  const nextImage = useCallback(() => cycleImages(+1), [cycleImages]);
  const prevImage = useCallback(() => cycleImages(-1), [cycleImages]);

  const zoomIn = useCallback(() => {
    if (zoom === 'auto') {
      const containerSize = containerRef.current
        ? containerRef.current.getBoundingClientRect()
        : { width: 0, height: 0 };
      setZoomClamped(calculateBestFitZoom(imageSize, containerSize) + 0.2);
    } else {
      setZoomClamped(zoom + 0.2);
    }
  }, [zoom, setZoomClamped, containerRef]);

  const zoomOut = useCallback(() => {
    if (zoom !== 'auto') setZoomClamped(zoom - 0.2);
  }, [zoom, setZoomClamped]);

  const setBestFit = useCallback(() => setZoom('auto'), [setZoom]);
  const setActualSize = useCallback(() => setZoom(1), [setZoom]);

  const rotateCW = useCallback(() => {
    const rotatedImage = rotateImage(
      containerRef.current!.firstChild as HTMLImageElement,
      getMimeType(path)
    );
    writeImage(writeData, rotatedImage);
  }, [containerRef, path, writeImage]);

  const rotateCCW = useCallback(() => {
    const rotatedImage = rotateImage(
      containerRef.current!.firstChild as HTMLImageElement,
      getMimeType(path),
      true
    );
    writeImage(writeData, rotatedImage);
  }, [containerRef, path, writeImage]);

  const onWheel = useCallback(
    (e: React.WheelEvent<any>) => {
      if (e.deltaY < 0) zoomIn();
      else zoomOut();

      e.preventDefault();
    },
    [zoomIn, zoomOut]
  );

  const actions = useMemo(
    () =>
      preventDefaultAll({
        NEXT_IMAGE: nextImage,
        PREVIOUS_IMAGE: prevImage,
        BEST_FIT: setBestFit,
        ACTUAL_SIZE: setActualSize,
        ROTATE_CW: rotateCW,
        ROTATE_CCW: rotateCCW,
      }),
    [nextImage, prevImage, setBestFit, setActualSize, rotateCW, rotateCCW]
  );

  return (
    <HotKeys
      keyMap={KeyboardShortcuts}
      handlers={actions}
      component={StyledPictureViewer}
      onWheel={onWheel}
      allowChanges>
      <Preview
        src={url!}
        ref={containerRef}
        zoom={zoom}
        imageSizeChanged={setImageSize}
      />
      <Toolbar>
        <Button onClick={prevImage}>
          <Icon src={assets.previous} />
        </Button>
        <Button onClick={nextImage}>
          <Icon src={assets.next} />
        </Button>
        <Separator />
        <Button onClick={setBestFit}>
          <Icon src={assets.bestFit} />
        </Button>
        <Button onClick={setActualSize}>
          <Icon src={assets.actualSize} />
        </Button>
        <Button disabled>
          <Icon src={assets.slideshow} />
        </Button>
        <Separator />
        <Button onClick={zoomIn}>
          <Icon src={assets.zoomIn} />
        </Button>
        <Button onClick={zoomOut}>
          <Icon src={assets.zoomOut} />
        </Button>
        <Separator />
        <Button onClick={rotateCW}>
          <Icon src={assets.rotateRight} />
        </Button>
        <Button onClick={rotateCCW}>
          <Icon src={assets.rotateLeft} />
        </Button>
        <Separator />
        <Button disabled>
          <Icon src={assets.remove} />
        </Button>
        <Button disabled>
          <Icon src={assets.print} />
        </Button>
        <Button disabled>
          <Icon src={assets.save} />
        </Button>
        <Button disabled>
          <Icon src={assets.edit} />
        </Button>
        <Separator />
        <Button disabled>
          <Icon src={assets.help} />
        </Button>
      </Toolbar>
    </HotKeys>
  );
};
