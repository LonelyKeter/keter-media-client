<template>
  <div class="user" v-if="userInfo">
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
      <media-item v-for="info in mediaInfos" :key="info.id" :info="info" />
    </table>
    <h1 v-else>No uploaded media</h1>
    <reg-media v-if="isCurrentUser" />
  </div>
  <h1 v-else>Couldn't load user info</h1>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { RouteParams } from "vue-router";

import MediaItem from "@/components/media/MediaItem.vue";
import UserInfo from "@/components/users/UserInfo.vue";

import { MediaInfo } from "@/model/media";
import { UserInfo as UInfo, UserKey } from "@/model/userinfo";

import { isApiSuccess, Media, Users } from "@/api";
import RegMedia from "@/components/media/RegisterMedia.vue";

interface Data {
  userInfo: UInfo | null;
  mediaInfos: MediaInfo[] | null;
}

function extractId(params: RouteParams): string {
  const param = params["id"];

  if (typeof param === "string") {
    return param;
  } else {
    return param[0];
  }
}

export default defineComponent({
  components: { UserInfo, MediaItem, RegMedia },
  data() {
    return {
      userInfo: null,
      mediaInfos: null,
    } as Data;
  },
  methods: {
    async loadUserInfo(id: UserKey) {
      const result = await Users.getUserInfo(id);

      if (isApiSuccess(result)) {
        this.userInfo = result;
      }
    },
    async loadUserMedia(id: UserKey) {
      const result = await Media.getAuthorsMedia(id);

      if (isApiSuccess(result)) {
        this.mediaInfos = result;
      }
    },
  },
  computed: {
    isCurrentUser(): boolean {
      if (!this.userInfo) {
        return false;
      } else {
        return this.$store.getters.isCurrentUser(this.userInfo?.id);
      }
    },
  },
  created() {
    const id = Number(extractId(this.$route.params));

    this.loadUserInfo(id);
    this.loadUserMedia(id);
  },
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