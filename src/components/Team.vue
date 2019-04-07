<template>
  <div>
    <img src="" /><p> {{team.name}} </p>
    </div>
</template>

<script>
import api from '@/api'
export default {
  props: {
    teamId: {
      type: Number,
      required: true 
    }
  },
  data: function () {
    return {
      team: {}
    }
  },
   async created () {
    this.getTeam()
  },
  methods: {
    async getTeam (){
      this.team = await api.getTeam(this.teamId)
    }
  }
}
</script>

<style>

</style>

