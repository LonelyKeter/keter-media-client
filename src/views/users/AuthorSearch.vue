<template>
  <div class="author-search">
    <authors-search-bar @submit="searchAuthors($event.options)" />
    <table>
      <colgroup>
        <col width="35%" />
        <col width="55%" />
        <col width="10%" />
      </colgroup>
      <author-row v-for="info in authorInfos" :key="info.id" :info="info"/>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { AuthorRow, AuthorsSearchBar } from "@/components/users";

import { AuthorsOptions } from "@/api/users";
import { isApiSuccess, Users } from "@/api";

import { AuthorInfo } from "@/model/userinfo";

type Data = {
  authorInfos: AuthorInfo[] | null;
};

export default defineComponent({
    components: {
        AuthorsSearchBar,
        AuthorRow
    },
  data(): Data {
    return {
      authorInfos: null,
    };
  },
  computed: {
  },
  methods: {
    async searchAuthors(options?: AuthorsOptions) {        
      const result = await Users.getAuthors(options);

      if (isApiSuccess(result)) {
        this.authorInfos = result;
      }
    },
  },
  created() {
      this.searchAuthors();
  }
});
</script>

<style>
</style>