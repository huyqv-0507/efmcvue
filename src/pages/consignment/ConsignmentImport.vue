<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="from">Nguồn nhập</label>
            <Textarea id="from" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-2">
            <label for="dateImported">Ngày nhập</label>
            <Calendar id="dateImported" dateFormat="dd/MM/yyyy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
