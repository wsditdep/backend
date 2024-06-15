"use client";

import React, { useState } from 'react';
import JoditEditorComponent from '../editor/JoditEditorComponent';
import QRCode from 'qrcode.react';

const Share = () => {

    const [qrText, setQrText] = useState(process.env.NEXT_PUBLIC_REGISTER_URL || "Link Here..");
    const [content, setContent] = useState(`
        <p><br></p><p>Welcome to [Your Website/Platform Name]! Join us in exploring [briefly mention what your platform offers, e.g., learning, networking, opportunities]. Together, let's [mention a goal or outcome users can achieve].</p><p>We’re excited to have you here. Dive in and discover [mention key features or benefits]. Feel free to [invite action, e.g., explore, connect, engage].</p><p><br></p><p>You can join us via -&nbsp;</p><p>Register Link -&nbsp;<a href="https://client-side-link-register">https://client-side-link-register</a></p><p><br></p><p>Get started via -</p><p style="line-height: 1;">Login Link -&nbsp;<a href="https://client-side-link-register">https://client-side-link-login</a>in</p>
        `);
    console.log(content)

    const handleInputChange = (event) => {
        setQrText(event.target.value);
    };

    return (
        <section className="share-section">
            <div className="share-parent">
                <div className="share-childs">
                    <h3>Easy Share</h3>
                    <p>Share this code with your client</p>
                    <div className="share-child-input">
                        <div className="share-input-group">
                            <input
                                type="text"
                                value={qrText}
                                onChange={handleInputChange} placeholder="Enter text for QR code"
                            />
                        </div>
                        <div className="share-input-group">
                            <JoditEditorComponent value={content} onChange={setContent} />
                        </div>
                        <div className="share-input-group">
                            <button className="btn-md btn-tertiary">Generate</button>
                        </div>
                    </div>
                </div>
                <div className="share-childs">
                    <div className="share-child-review">
                        <div className="qr-code-ganerator">
                            {qrText && <QRCode value={qrText} />}
                        </div>
                        <div className="share-contents">
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Share;
