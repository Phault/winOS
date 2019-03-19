import React from 'react';
export function StartPanel({ ...rest }) {
    return (
        <div className="start-panel" {...rest}>
            <div className="start-panel-header">
                Administrator
                </div>
            <div className="start-panel-body">
                <div className="proglist">
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                            <p>Subtitle</p>
                        </div>
                    </div>
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                            <p>Subtitle</p>
                        </div>
                    </div>
                    <hr />
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <div className="spacer" />
                    <hr />
                    <div className="more-programs">
                        <span>All Programs</span>
                    </div>
                </div>
                <div className="placeslist">
                    <div className="proglist-item favorite">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <div className="proglist-item favorite">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <div className="proglist-item">
                        <div className="icon" />
                        <div className="content">
                            <h1>Title</h1>
                        </div>
                    </div>
                    <div className="spacer" />
                </div>
            </div>
            <div className="start-panel-footer">
                <div className="start-panel-footer-btn btn-logoff">
                    Log Off
                    </div>
                <div className="start-panel-footer-btn btn-shutdown">
                    Shut Down
                    </div>
            </div>
        </div>
    );
}
