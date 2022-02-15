<template>
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Blank Page</h1>
                </div>
                <!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/">{{ $t('labels.home') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active">Blank</li>
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
                    <h4 class="m-0 text-info">Blank Contents</h4>
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
const log = require('debug')('admin:blank');

export default {
    components: {
    },
    data() {
        return {
        }
    },
    async mounted() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
    }
}

</script>
