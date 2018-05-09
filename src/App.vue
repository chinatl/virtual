<template>
  <div id="app">
  <div class="header">
	<my-header></my-header>
  </div>
	<router-view></router-view>
	<div class="footer">
		<my-footer></my-footer>
	</div>
  </div>
</template>

<script>
    import myHeader from '@/components/Header'
    import myFooter from '@/components/Footer'
    export default {
        name: 'App',
        components: {
            myHeader,
            myFooter
        }
    }

</script>

<style>
    * {
        font: inherit;
        color: inherit;
        outline: 0;
        border: 0;
        margin: 0;
        padding: 0;
        font-style: normal;
        list-style: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box
    }

    body {
        font: 12px/1 "PingFang SC", "Hiragino Sans GB", "Heiti SC", 'Microsoft Yahei UI', 'Microsoft Yahei', simsun, sans-serif;
        -webkit-tap-highlight-color: transparent;
    }

    a {
        text-decoration: none;
        font-size: 12px
    }

    input {
        display: block;
        width: 100%;
        padding: 0 10px;
        font-size: 12px;
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        background-color: transparent;
        color: #2d3035;
        border: none;
        border-radius: 0;
        -webkit-appearance: none;
        -webkit-backface-visibility: hidden;
        -webkit-transition: all .2s ease;
        transition: all .2s ease;
    }

    [role=button],
    a {
        cursor: pointer;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }

    #app {}

    .header {
        width: 100%;
    }

    b {
        font-weight: 700 !important;
    }

    /*
	.el-table td,
	.el-table th {
		padding: 8px
	}
*/

    .el-table thead {
        color: #000;
        font-weight: bold
    }

    .el-table__body tbody {
        font-size: 13px;
        font-weight: bold;
    }

    .el-table__body tbody div.cell {
        white-space: nowrap
    }

    .page_size {
        margin: 10px;
        text-align: right;
    }

    .tender .el-pager li.number {
        line-height: 28px;
        height: 28px;
    }

    .el-dialog--center .el-dialog__body {
        padding-bottom: 1px;
    }

</style>
