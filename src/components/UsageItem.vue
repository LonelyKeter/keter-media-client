<template>
  <tr class="row-1">
    <td v-if="userInfo">
      <router-link :to="{ name: 'User', params: { id: userInfo.id } }">
        {{ userInfo.name }}
      </router-link>
    </td>
    <td>
      <div>
        {{ dateString }}
      </div>
    </td>
    <td>
      <router-link
        :to="{ name: 'MaterialDetails', params: { id: usage.materialId } }"
      >
        {{ usage.materialId }}
      </router-link>
    </td>
    <td>
      <router-link
        :to="{ name: 'LicenseDetails', params: { key: usage.license.id } }"
      >
        {{ usage.license.title }}
      </router-link>
    </td>    
    <td v-if="downloadEnabled">
        <button @click="download()">
            Download
        </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Usage } from "@/model/usage";
import { UserInfo } from "@/model/userinfo";
import { defineComponent, PropType } from "@vue/runtime-core";

interface Data {
    dateString: string
}

export default defineComponent({
  props: {
    userInfo: {
      type: Object as PropType<UserInfo>,
      required: false,
    },
    usage: {
      type: Object as PropType<Usage>,
      required: true,
    },
    ratingEnabled: {
        type: Boolean,
        default: false
    },
    downloadEnabled: {
        type: Boolean,
        default: false
    }
  },  
  setup(props): Data {
    const dateString = new Date(props.usage.date).toLocaleDateString(
      undefined,
      {
        weekday: "narrow",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    return {
      dateString,
    };
  },
  methods: {
      download() {
          
      }
  }
});
</script>

<style>
</style>