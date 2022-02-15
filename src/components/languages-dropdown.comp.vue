<template>
    <app-dropdown ref="langMenu">
        <template v-slot:dropdown-button>
            <i class="flag-icon" :class="flagIcon"></i>
        </template>
        <template v-slot:dropdown-menu>
            <a
                class="dropdown-item"
                :class="{active: selectedLanguage === language.key}"
                @click="changeLanguage(language.key)"
                v-for="language in languages"
            >
                <i class="flag-icon mr-2" :class="language.flag"></i>
                {{ $t(language.label) }}
            </a>
        </template>
    </app-dropdown>
</template>

<style scoped>
.dropdown-item {
    cursor: pointer;
}
</style>

<script>
import Dropdown from '@/components/dropdown.comp.vue';

export default {
    name: 'languages-dropdown',
    emits: ['select'],
    props: {},
    components: {
        'app-dropdown': Dropdown
    },
    data() {
        return {
            selectedLanguage: null,
            languages: [
                {
                    key: 'en',
                    flag: 'flag-icon-us',
                    label: 'languages.english'
                },
                {
                    key: 'ko',
                    flag: 'flag-icon-kr',
                    label: 'languages.korean'
                }
            ]
        };
    },
    mounted() {
        this.selectedLanguage = this.$i18n.locale;
    },
    computed: {
        flagIcon() {
            if (this.selectedLanguage === 'ko') {
                return 'flag-icon-kr';
            }
            return 'flag-icon-us';
        }
    },
    methods: {
        changeLanguage(langCode) {
            if (this.$i18n.locale !== langCode) {
                this.$i18n.locale = langCode;
                this.selectedLanguage = langCode;
                this.$refs.langMenu.toggleDropdown();
            }
        }
    }
};
</script>
