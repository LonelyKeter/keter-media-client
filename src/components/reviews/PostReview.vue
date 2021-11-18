<template>
  <form class="post-review" @submit.prevent="submitReview()">
    <label>Leave comment</label>
    <textarea v-model="text" class="review-input" />
    <button type="submit" :disabled="text === ''">Submit</button>
  </form>
</template>

<script lang="ts">
import media from "@/api/media";
import { Review, MediaKeyConstructor } from "@/model/media";
import { defineComponent } from "vue";
import { isApiSuccess } from "@/api";

interface Data {
  text: string;
}

export default defineComponent({
  props: {
    mediaId: {
      type: MediaKeyConstructor,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    } as Data;
  },
  methods: {
    async submitReview() {
      const token = this.$store.state.user.token;
      const review: Review = {
          text: this.text
      };

      if (token) {
        const result = await media.postReview(this.mediaId, review, token);

        if (isApiSuccess(result)) {

        } else {
            alert("Failed to post review")
        }
      } else {
        alert("Auth required");
      }
    },
  },
});
</script>

<style>
form.post-review {
  display: flex;
  flex-direction: column;
}

.post-review > * {
  margin: 3pt 0;
}

.post-review > button {
  margin: 0;
  width: fit-content;
  align-self: end;
}

textarea.review-input {
  min-width: 300px;
  padding: 7pt;

  resize: none;
}
</style>