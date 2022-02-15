<template>
    <footer class="main-footer">
        <strong>
            <span>{{ $t('labels.copyright') }} &copy; {{ currentYear }}</span>
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>&nbsp;Admin Project</span>
            </a>
            <span>.</span>
        </strong>
        <div class="float-right d-none d-sm-inline-block">
            <b>{{ $t('labels.version') }}</b>
            <span>:&nbsp;{{ version }}</span>
        </div>
    </footer>
</template>

<style></style>

<script>
import {Options, Vue} from 'vue-class-component';
import {version} from '../../package.json';
import {DateTime} from 'luxon';

export default {
    data() {
        return {
            version: '',
            currentYear: DateTime.now().toFormat('y')
        };
    }
};
</script>
