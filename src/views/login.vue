<template>
<div class="login-box">
    <!-- /.login-logo -->
    <div class="card card-outline card-primary">
        <div class="card-header text-center">
            <router-link to="/" class="h1"
                ><b>{{ $t("labels.admin") }}</b>{{ $t("labels.lte")
                }}</router-link
            >
        </div>
        <div class="card-body">
            <p class="login-box-msg">{{ $t("labels.signInToStart") }}</p>

            <form @submit.prevent="loginByAuth">
                <app-input
                    icon="envelope"
                    class="mb-3"
                    type="email"
                    placeholder="Email"
                    autocomplete="off"
                    v-model="email"
                />
                <app-input
                    icon="lock"
                    class="mb-3"
                    type="password"
                    placeholder="Password"
                    autocomplete="off"
                    v-model="password"
                />

                <div class="row">
                    <div class="col-7">
                        <app-checkbox type="icheck" v-model="rememberMe">
                            {{ $t("labels.rememberMe") }}
                        </app-checkbox>
                    </div>
                    <!-- /.col -->
                    <div class="col-5">
                        <app-button
                            class="btn-primary"
                            type="submit"
                            block="true"
                            :loading="isAuthLoading"
                            :disabled="isFacebookLoading || isGoogleLoading"
                        >
                            {{ $t("labels.signIn") }}
                        </app-button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

            <div class="social-auth-links text-center mt-2 mb-3">
                <app-button
                    class="btn-primary"
                    icon="facebook"
                    block="true"
                    @click="loginByFacebook"
                    :loading="isFacebookLoading"
                    :disabled="isAuthLoading || isGoogleLoading"
                >
                    {{ $t("labels.signInUsingFB") }}
                </app-button>
                <app-button
                    class="btn-danger"
                    icon="google-plus"
                    block="true"
                    @click="loginByGoogle"
                    :loading="isGoogleLoading"
                    :disabled="isAuthLoading || isFacebookLoading"
                >
                    {{ $t("labels.SignInUsingGoogle") }}
                </app-button>
            </div>
            <!-- /.social-auth-links -->

            <p class="mb-1">
                <router-link to="/forgot-password">
                    {{ $t("labels.forgotPassword") }}
                </router-link>
            </p>
            <p class="mb-0">
                <router-link to="/register" class="text-center">
                    {{ $t("labels.registerMembership") }}
                </router-link>
            </p>
        </div>
        <!-- /.card-body -->
    </div>
    <!-- /.card -->
</div>

</template>

<style scoped></style>


<script>
const log = require('debug')('admin:login');
import {Options, Vue} from 'vue-class-component';
import {loginByAuth, loginByGoogle, loginByFacebook} from '@/services/auth';
import Checkbox from '@/components/admin-lte/checkbox.vue';
import Input from '@/components/admin-lte/input.vue';
import Button from '@/components/admin-lte/button.vue';
import {useToast} from 'vue-toastification';

const toast = useToast();

export default {
    data() {
        return {
            appElement: null,
            email: '',
            password: '',
            rememberMe: false,
            isAuthLoading: false,
            isFacebookLoading: false,
            isGoogleLoading: false,
        };
    },
    components: {
        'app-checkbox': Checkbox,
        'app-input': Input,
        'app-button': Button
    },
    mounted() {
        this.appElement = document.getElementById('app');
        this.appElement.classList.add('login-page');
    },
    unmounted() {
        (this.appElement).classList.remove('login-page');
    },
    methods: {

        async loginByAuth(){
            try {
                this.isAuthLoading = true;
                const token = await loginByAuth(this.email, this.password);
                this.$store.dispatch('auth/login', token);
                toast.success('Login succeeded');
                this.isAuthLoading = false;
            } catch (error) {
                console.log(error);
                toast.error(error.message);
                this.isAuthLoading = false;
            }
        },
        async loginByFacebook() {
            try {
                this.isFacebookLoading = true;
                const token = await loginByFacebook();
                this.$store.dispatch('auth/login', token);
                toast.success('Login succeeded');
                this.isFacebookLoading = false;
            } catch (error) {
                toast.error(error.message);
                this.isFacebookLoading = false;
            }
        },
        async loginByGoogle(){
            try {
                this.isGoogleLoading = true;
                const token = await loginByGoogle();
                this.$store.dispatch('auth/login', token);
                toast.success('Login succeeded');
                this.isGoogleLoading = false;
            } catch (error) {
                toast.error(error.message);
                this.isGoogleLoading = false;
            }
        }
    }
}

</script>
