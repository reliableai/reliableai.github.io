/* Course analytics: no Google tag is loaded until the visitor opts in. */
(() => {
  'use strict';
  const measurementId = 'G-813BQKGXPX';
  const preferenceKey = 'eval-course-analytics-consent-v1';
  let enabled = false;
  let preference;
  try { preference = localStorage.getItem(preferenceKey); } catch (_) {}

  function startAnalytics() {
    if (enabled) return;
    enabled = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      cookie_path: '/ai-ready-engineer-eval/',
      cookie_domain: 'none',
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(tag);
  }

  const style = document.createElement('style');
  style.textContent = `
    #course-analytics-choice { position:fixed; bottom:16px; left:16px; right:16px;
      max-width:720px; margin:auto; padding:20px; box-sizing:border-box;
      border:1px solid #cbd5e1; border-radius:12px; background:#fff; color:#172033;
      box-shadow:0 4px 24px #0002; z-index:10000; font:16px/1.5 system-ui,sans-serif; }
    #course-analytics-choice[hidden] { display:none; }
    #course-analytics-choice p { margin:0 0 14px; }
    #course-analytics-choice .actions { display:flex; gap:12px; flex-wrap:wrap; }
    #course-analytics-choice button { font:inherit; cursor:pointer; background:#fff;
      color:#172033; padding:8px 16px; border:1px solid #64748b; border-radius:6px; }
    #course-analytics-choice button:focus-visible, #course-analytics-settings:focus-visible {
      outline:3px solid #2563eb; outline-offset:3px; }
    #course-analytics-settings { display:block; margin:18px auto; padding:6px 10px;
      border:0; background:transparent; color:inherit; font:14px system-ui,sans-serif;
      text-decoration:underline; cursor:pointer; }
  `;
  document.head.appendChild(style);

  const choice = document.createElement('section');
  choice.id = 'course-analytics-choice';
  choice.setAttribute('role', 'region');
  choice.setAttribute('aria-label', 'Analytics preferences');
  choice.innerHTML = '<p>May we use Google Analytics to understand visits, which links brought you here, and clicks to lessons? Analytics uses cookies and shares usage data with Google. You can change your choice below at any time.</p><div class="actions"><button type="button" data-choice="accepted">Accept analytics</button><button type="button" data-choice="declined">Decline analytics</button></div>';
  document.body.appendChild(choice);

  const settings = document.createElement('button');
  settings.id = 'course-analytics-settings';
  settings.type = 'button';
  settings.textContent = 'Analytics preferences';
  (document.querySelector('footer') || document.body).appendChild(settings);
  settings.addEventListener('click', () => {
    choice.hidden = false;
    choice.querySelector('button').focus();
  });

  choice.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-choice]');
    if (!button) return;
    const next = button.dataset.choice;
    try { localStorage.setItem(preferenceKey, next); } catch (_) {}
    choice.hidden = true;
    if (next === 'accepted') {
      startAnalytics();
    } else if (enabled) {
      window['ga-disable-' + measurementId] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name === '_ga_813BQKGXPX') {
          document.cookie = name + '=; Max-Age=0; Path=/ai-ready-engineer-eval/; SameSite=Lax';
        }
      }
      // Reload without the tag to stop any previously registered listeners.
      window.location.reload();
    }
  });

  choice.hidden = preference === 'accepted' || preference === 'declined';
  if (preference === 'accepted') startAnalytics();
})();
