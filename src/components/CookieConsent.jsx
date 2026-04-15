import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie-consent';

function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            setVisible(true);
        }
    }, []);

    function handleAccept() {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        setVisible(false);
    }

    function handleDecline() {
        localStorage.setItem(STORAGE_KEY, 'declined');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="cookie-consent" role="dialog" aria-label="Cookie 同意">
            <div className="cookie-consent__inner container">
                <p className="cookie-consent__text">
                    本網站使用 Cookie 以提升您的瀏覽體驗。繼續使用即表示您同意我們的 Cookie 政策。
                </p>
                <div className="cookie-consent__actions">
                    <button
                        className="btn btn--sm cookie-consent__btn cookie-consent__btn--accept"
                        onClick={handleAccept}
                    >
                        接受
                    </button>
                    <button
                        className="btn btn--sm cookie-consent__btn cookie-consent__btn--decline"
                        onClick={handleDecline}
                    >
                        拒絕
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;
