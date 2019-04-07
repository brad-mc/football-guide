<template>
<div class="card">
<v-team v-bind:teamId="1"/> <p> V </p> <v-team v-bind:teamId="1"/>
</div>
  
</template>

<script>
import api from '@/api'
import Team from "Components/Team.vue";

export default {
  components: {
    'v-team': Team
  },
  props: {
    homeTeamId: {
      type: Number,
      required: true 
    },
     awayTeamId: {
      type: Number,
      required: true 
    }
  },
  async created () {
    this.getTeams()
  },
  methods: {
    async getTeams() {
      this.homeTeamId = await api.getTeam(this.homeTeamId)
      this.awayTeamId = await api.getTeam(this.awayTeamId)
    }
  }
}
</script>

<style>

</style>

