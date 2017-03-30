import Vue from 'vue';
import $ from 'jquery';


var vm = new Vue({
   el: "#app",
   data: {
    condition: "",
    resOK: false,
    searchIng: false,
    result: [],
    filter: ""
   },
   created: function() {
      this.search();
   },
   computed: {
    realConditon: function() {
      return $.trim(this.condition) === "" ? "javascript" : this.condition;
    },
    filteredResult: function() {
      return this.result.filter(function(item) {
        var reg = new RegExp(vm.filter);
        return reg.test(item.description) || reg.test(item.name);
      });
    }
   },
   methods: {
    search: function() {
        this.resOK = false;
        this.searchIng = true;
        $.getJSON({
          url: 'https://api.github.com/search/repositories?q=' + this.realConditon + '&sort=stars',
          success: function(data) {
            vm.refreshData(data);
          }
        });
    },
    refreshData: function(data) {
      this.resOK = true;
      this.searchIng = false;
      this.result = data.items
    },
    reverseResult: function() {
      this.result.reverse();
    }
   }
})