/* Optional, consent-first Google Analytics for Delightful Providence. */
(() => {
    "use strict";

    const measurementId = "G-1LS4BSJ23P";
    const consentKey = "dpAnalyticsConsent";
    const banner = document.getElementById("analytics-consent-banner");
    const dialog = document.getElementById("analytics-settings-dialog");
    const openSettings = document.getElementById("analytics-settings-open");
    const closeSettings = document.getElementById("analytics-settings-close");
    const acceptButtons = document.querySelectorAll("[data-analytics-accept]");
    const declineButtons = document.querySelectorAll("[data-analytics-decline]");
    let analyticsLoaded = false;

    const readConsent = () => {
        try {
            return localStorage.getItem(consentKey);
        } catch (_) {
            return null;
        }
    };

    const saveConsent = (value) => {
        try {
            localStorage.setItem(consentKey, value);
        } catch (_) {
            // The visitor can still choose for this page view if storage is unavailable.
        }
    };

    const removeAnalyticsCookies = () => {
        const expiry = "Thu, 01 Jan 1970 00:00:00 GMT";
        const domains = [location.hostname, `.${location.hostname}`];
        document.cookie.split(";").forEach((cookie) => {
            const name = cookie.trim().split("=")[0];
            if (name === "_ga" || name.indexOf("_ga_") === 0) {
                domains.forEach((domain) => {
                    document.cookie = `${name}=; expires=${expiry}; path=/; domain=${domain}; SameSite=Lax`;
                });
                document.cookie = `${name}=; expires=${expiry}; path=/; SameSite=Lax`;
            }
        });
    };

    const disableAnalytics = () => {
        window[`ga-disable-${measurementId}`] = true;
        removeAnalyticsCookies();
    };

    const loadAnalytics = () => {
        if (analyticsLoaded) return;
        analyticsLoaded = true;
        window[`ga-disable-${measurementId}`] = false;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", measurementId, {
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            send_page_view: false
        });
        window.gtag("event", "page_view", {
            page_location: `${location.origin}${location.pathname}`,
            page_title: document.title
        });

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.referrerPolicy = "origin";
        document.head.appendChild(script);
    };

    const hideChoices = () => {
        banner.hidden = true;
        dialog.hidden = true;
    };

    const accept = () => {
        saveConsent("granted");
        hideChoices();
        loadAnalytics();
    };

    const decline = () => {
        saveConsent("denied");
        hideChoices();
        disableAnalytics();
    };

    acceptButtons.forEach((button) => button.addEventListener("click", accept));
    declineButtons.forEach((button) => button.addEventListener("click", decline));
    openSettings.addEventListener("click", () => { dialog.hidden = false; });
    closeSettings.addEventListener("click", () => { dialog.hidden = true; });

    if (readConsent() === "granted") {
        loadAnalytics();
    } else if (readConsent() === "denied") {
        disableAnalytics();
    } else {
        banner.hidden = false;
    }
})();
