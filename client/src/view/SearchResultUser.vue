<template>
  <div>
    <SearchBarUser @change="change" @cancel="cancel"></SearchBarUser>
    <mu-list>
      <mu-sub-header v-if="searchUserList.length === 0">暂无查询结果</mu-sub-header>
      <mu-list-item avatar button :ripple="false" v-for="item in searchUserList" :key="item._id" @click="lookInfo(item)">
        <mu-list-item-action>
          <mu-avatar>
            <img :src="item.src">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-title>{{item.name}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="chat_bubble"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchBarUser from "@components/searchBarUser";
import debounce from 'lodash/debounce';

export default {
  name: 'SearchResultUser',

  components: {
    SearchBarUser
  },
  data () {
    return {
    };
  },

  computed: {
    ...mapState([
      'searchUserList'
    ])
  },

  mounted() {

  },

  methods: {
    change (value) {
      console.log(value);
      this.$store.dispatch('getSearchUser', {name: value});
    },
    cancel() {
      console.log('cancel');
      this.$router.isBack = true;
      this.$router.goBack();
    },
    lookInfo(item) {
      this.$router.push({ path: "/persionDetail", query: { id: item.name } });
    }
  }
}

</script>
<style lang='scss' scoped>
</style>