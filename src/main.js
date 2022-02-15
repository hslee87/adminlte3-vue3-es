import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {Gatekeeper} from 'gatekeeper-client-sdk';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGooglePlus } from '@fortawesome/free-brands-svg-icons';
// import {Gatekeeper} from 'gatekeeper-client-sdk';
import Toast, { PluginOptions } from 'vue-toastification';
import { createI18n } from 'vue-i18n';
import { VueWindowSizePlugin } from 'vue-window-size/option-api';

import en from './translation/en.json';
import ko from './translation/ko.json';

library.add(faLock, faEnvelope, faFacebook, faGooglePlus);

Gatekeeper.initialize('de378d9c-38c8-42c1-b961-9e4fa92d6a5e');

localStorage.debug='app:*,store:*,admin:*';

// PluginOptions
const options = {
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
};
const i18n = createI18n({
    locale: 'en',
    messages: { en, ko },
    fallbackLocale: 'en'
});

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(VueWindowSizePlugin)
    .use(Toast, options)
    .use(i18n)
    .mount('#app');
