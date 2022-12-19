<template>
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">{{ $t('labels.dashboard') }}</h1>
                </div>
                <!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/">{{
                                $t('labels.home')
                            }}</router-link>
                        </li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">

            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4 class="m-0 text-info">Smart Contracts</h4>
                </div>
            </div>

            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>NOT YET OPEN</h3>
                            <p>User</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-bag"></i>
                        </div>
                        <router-link to="/blank" class="small-box-footer"
                        >Stat <i class="fas fa-arrow-circle-right"></i
                        ></router-link>
                    </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>NOT YET OPEN</h3>
                            <p>COIN</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-stats-bars"></i>
                        </div>
                        <router-link to="/blank" class="small-box-footer"
                            >Create <i class="fas fa-arrow-circle-right"></i
                        ></router-link>
                    </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-warning">
                        <div class="inner">
                            <h3>NOT YET OPEN</h3>
                            <p>NFT</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-person-add"></i>
                        </div>
                        <router-link to="/blank" class="small-box-footer"
                            >Reward <i class="fas fa-arrow-circle-right"></i
                        ></router-link>
                    </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-danger">
                        <div class="inner">
                            <h3>NOT YET OPEN</h3>
                            <p>Farming</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-pie-graph"></i>
                        </div>
                        <router-link to="/" class="small-box-footer"
                            >TBD <i class="fas fa-arrow-circle-right"></i
                        ></router-link>
                    </div>
                </div>
                <!-- ./col -->
            </div>
            <!-- /.row -->

            <div class="row">
                <div class="col-md-12 text-center">
                </div>
                <div class="col-md-6">
                    <p class="text-center"><strong>Sale / Mining Stat</strong></p>

                    <div class="progress-group">
                        Sale - Reserved Token
                        <span class="float-right"><b>160</b>/200</span>
                        <div class="progress progress-sm">
                            <div
                                class="progress-bar bg-primary"
                                style="width: 80%"
                            ></div>
                        </div>
                    </div>
                    <div class="progress-group">
                        Sale - Setup Token
                        <span class="float-right"><b>310</b>/400</span>
                        <div class="progress progress-sm">
                            <div
                                class="progress-bar bg-danger"
                                style="width: 75%"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <p class="text-center"><strong>Token Stat</strong></p>
                    <div class="progress-group">
                        <span class="progress-text">Supply</span>
                        <span class="float-right"><b>480</b>/800</span>
                        <div class="progress progress-sm">
                            <div
                                class="progress-bar bg-success"
                                style="width: 60%"
                            ></div>
                        </div>
                    </div>

                    <div class="progress-group">
                        Staking
                        <span class="float-right"><b>250</b>/500</span>
                        <div class="progress progress-sm">
                            <div
                                class="progress-bar bg-warning"
                                style="width: 50%"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
</template>

<style scoped>
</style>

<script>
const log = require('debug')('admin:dashboard');
import AdminMixin from '@/mixins/admin.mixin.js';
import moment from 'moment'; 

export default {
    mixins: [AdminMixin],
    components: {
    },
    data() {
        return {

        }
    },
    async mounted() {
        const vm = this;
        try {
        }
        catch (e) {
            log('Error : %O', e);
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
    }
}


</script>
