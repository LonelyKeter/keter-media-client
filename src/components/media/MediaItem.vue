<template>
  <tr class="media-item row1">
    <td>
      <router-link
        tag="li"
        :to="{ name: 'MediaDetails', params: { id: info.id } }"
        class="media-title"
      >
        {{ info.title }}
      </router-link>
    </td>
    <td>
      <router-link
        class="media-author"
        :to="{ name: 'User', params: { id: info.author.id } }"
      >
        {{ info.author.name }}
      </router-link>
    </td>
    <td>
      <p class="author-country">{{ info.author.country }}</p>
    </td>
    <td>
      <p class="media-kind">{{ info.kind }}</p>
    </td>
    <td>
      <p class="media-rating">{{ info.rating }}</p>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MediaInfo} from "@/model/media";

export default defineComponent({
  name: "Media",

  props: {
    info: {
        type: Object as PropType<MediaInfo>,
        required: true
    }
  },

  data() {
    return {};
  },

  setup() {},

  computed: {
      roundedRating(): string {
          return this.info.rating?.toPrecision(4) ?? "";
      }
  }
});
</script>

<style scoped>
td.media-item {
  margin: auto;
}

tr.media-item td {
  text-align: left;
}

.media-item a:hover {
  transform: scale(1.5);
  text-decoration: underline;
}

tr.media-item a {
  margin: 5%;
  text-decoration-line: none;
  color: inherit;
  text-anchor: middle;
}

tr.media-item .media-author {
  color: rgb(3, 29, 143);
}

tr.media-item .media-kind {
  color: orange;
}
</style>