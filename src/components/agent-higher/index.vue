<template>
  <div id="agent-sa">
    <h3>上级代理商信息</h3>
    <div class="content">
      <x-table v-if="data">
        <tbody>
          <tr>
            <td>代理商ID</td>
            <td> {{ data.agency_id }}</td>
          </tr>
          <tr>
            <td>代理商名称</td>
            <td> {{ data.nickname }}</td>
          </tr>
          <tr>
            <td>联系方式</td>
            <td> {{ data.telephone }}
            </td>
          </tr>
           <tr>
            <td>代理商星级</td>
            <td> {{ data.level+'星' }}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>
<script src="./agenthigher.js"></script>
<style lang="scss" scope>
#agent-sa {
  h3 {
    text-align: center;
    margin: 20px 0;
  }
  .content {
    margin-left: 5%;
    width: 90%;
    font-size: 14px;
  }
  tbody {
    tr {
      td:nth-of-type(1) {
        padding-right: 20px;
        width: 40%;
        text-align: right;
      }
    }
  }
}
</style>
