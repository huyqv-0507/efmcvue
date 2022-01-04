<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <Toolbar class="p-mb-4">
          <template v-slot:left>
            <Button
              label="Nhập thuốc"
              icon="pi pi-plus"
              class="p-button-success p-mr-2"
              @click="importConsignment"
            />
          </template>
        </Toolbar>
        <Dialog
          header="Điền thông tin" :closable="false"
          :visible="pharmacyDisplayChoosing"
          :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
          :style="{ width: '50vw' }"
        >
          <template #footer>
            <Button
              label="Huỷ"
              icon="pi pi-times"
              @click="cancelPharmacyDisplayChoosing"
              class="p-button-text"
            />

            <Button
              type="button"
              label="Xác nhận"
              icon="pi pi-check"
              @click="confirmConsignmentImported"
            ></Button>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import router from '../../router'

export default {
	data () {
		return {
			pharmacyDisplayChoosing: false
		}
	},
	methods: {
		importConsignment () {
			this.pharmacyDisplayChoosing = true
			// router.push('consignment-import')
		},
		cancelPharmacyDisplayChoosing () {
			this.pharmacyDisplayChoosing = false
		},
		confirmConsignmentImported () {
		}
	}
}
</script>

<style>
</style>
