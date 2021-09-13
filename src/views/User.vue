<template>
  <div class="user">
    <user-info :info="userInfo" />
    <h4>Uploaded media</h4>
    <table class="small" v-if="mediaInfos">
      <colgroup>
        <col width="auto" />
        <col width="auto" />
        <col width="5%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <media-item v-for="info in mediaInfos" :key="Number(info.id)" :info="info" />
    </table>
    <table v-if="materialUsages"></table>
  </div>
</template>

<script lang="ts">
import { MediaInfo, toMediaKey } from "@/model/media";
import { defineComponent } from "@vue/runtime-core";
import MediaItem from "../components/MediaItem.vue";
import UserInfo from "../components/UserInfo.vue";

import { UserInfo as UInfo, UserKey } from "../model/userinfo";

export default defineComponent({
  components: { UserInfo, MediaItem },
  data() {
    return {
      userInfo: {
        id: BigInt(1),
        name: "John",
      } as UInfo,
      mediaInfos: [
        {
          id: toMediaKey(1),
          title: "Aaaa",
          kind: "Video",
          author: {
            id: toMediaKey(1),
            name: "Louis",
            country: "UA",
          },
          rating: 8.4,
        },
      ] as MediaInfo[],
      materialUsages: [] ,
    };
  },
  methods: {
      async loadUserInfo(id: UserKey) {
          
      }
  },
  created() {

  }
});
</script>

<style>
div.user {
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

div.user > h4 {
  text-align: left;
  margin: 1em auto auto 0;
}

div.user > table.small {
  margin-left: 2em;
  font-size: small;
}
</style>