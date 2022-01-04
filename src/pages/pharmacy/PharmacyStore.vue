<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <Toolbar class="p-mb-4">
          <template v-slot:left>
            <Button
              label="Thêm cơ cở"
              icon="pi pi-plus"
              class="p-button-success p-mr-2"
              @click="addNewPharmacy"
            />
          </template>
        </Toolbar>
        <Toast />
        <Dialog
          header="Cơ sở mới"
          :visible="addNewPharmacyDialog"
          :closable="false"
        >
          <div class="p-fluid">
            <div class="p-field">
              <label for="pharmacyName">Tên cơ sở</label>
              <InputText v-model="name" type="text" />
            </div>
            <div class="p-field">
              <label for="address">Địa chỉ</label>
              <div class="p-fluid p-formgrid p-grid">
                <div class="p-col">
                  <Dropdown
                    v-model="selectedProvince"
                    :options="provinces.results"
                    optionLabel="province_name"
                    placeholder="Chọn tỉnh, thành phố"
                    @change="changeProvince($event)"
                  />
                </div>
                <div class="p-col">
                  <Dropdown
                    v-model="selectedDistrict"
                    :options="districts.results"
                    optionLabel="district_name"
                    v-bind:class="{ 'hide-district': hideDistrict }"
                    placeholder="Chọn quận, huyện"
                    @change="changeDistrict($event)"
                  />
                </div>
                <div class="p-col">
                  <Dropdown
                    v-model="selectedWard"
                    :options="wards.results"
                    optionLabel="ward_name"
                    placeholder="Chọn phường, xã"
                    v-bind:class="{ 'hide-ward': hideWard }"
                    @change="changeWard($event)"
                  />
                </div>
              </div>
              <Textarea
                v-model="addressDetail"
                style="margin-top: 0.5em"
                placeholder="Số nhà, số đường, thôn..."
                v-bind:class="{ 'hide-address-detail': hideAddressDetail }"
              ></Textarea>
              <div v-bind:class="{ 'hide-address-detail': hideAddressDetail }">
                <div class="pharmacist-addition">
                  <Checkbox
                    v-model="pharmacistChecked"
                    :binary="true"
                    @change="pharmacistChange"
                  />
                  <label for="pharmacistChk">Thêm dược sĩ</label>
                </div>
                <div
                  class="p-fluid p-formgrid p-grid"
                  v-bind:class="{
                    'hide-pharmacist-addition': hidePharmacistAddition,
                  }"
                >
                  <div class="p-col">
                    <label for="pharmacistCount">Số lượng</label>
                    <InputNumber
                      id="pharmacistCount"
                      v-model="pharmacistCount"
                    />
                  </div>
                  <div class="p-col">
                    <label for="userNameFormat">Định dạng tên đăng nhập</label>
                    <InputText type="userNameFormat" v-model="userNameFormat" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <Button
              class="p-button-secondary"
              type="button"
              label="Huỷ"
              icon="pi pi-times"
              @click="cancelAddNewPharmacy"
            ></Button>
            <Button
              type="button"
              label="Xác nhận"
              icon="pi pi-check"
              @click="confirmPharmacyCreation"
            ></Button>
          </template>
        </Dialog>

        <DataTable
          :value="pharmacies"
          dataKey="id"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        >
          <template #header>
            <div
              class="
                table-header
                p-d-flex
                p-flex-column
                p-flex-md-row
                p-jc-md-between
                p-ai-start
                p-ai-md-center
              "
            >
              <h5 class="p-mb-2 p-m-md-0">Danh sách cơ sở</h5>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Search..." />
                <Button
                  style="margin-left: 1em"
                  icon="pi pi-refresh"
                  @click="getPharmacies"
                />
              </span>
            </div>
          </template>
          <Column field="pharmacyId" header="Mã"></Column>
          <Column field="name" header="Tên cơ sở"></Column>
          <Column field="address" header="Địa chỉ"></Column>
          <Column field="dateCreated" header="Ngày tạo" :sortable="true">
            <template #body="{ data }">
              <span>{{ formatDate(data.dateCreated) }}</span>
            </template>
          </Column>
          <Column field="status" header="Trạng thái" :sortable="true">
            <template #body="slotProps">
              <span
                :class="
                  'pharmacy status-' + slotProps.data.status.toLowerCase()
                "
              >
                <span v-if="slotProps.data.status === 'Activate'"
                  >Đang hoạt động</span
                >
                <span v-else-if="slotProps.data.status === 'Inactivate'"
                  >Ngưng hoạt động</span
                >
                <span v-else-if="slotProps.data.status === 'Block'"
                  >Đã khoá</span
                >
              </span>
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button
                label="Chi tiết"
                @click="viewDetail(slotProps.data)"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../../router'
export default {
	data () {
		return {
			addNewPharmacyDialog: false,
			selectedProvince: null,
			selectedDistrict: null,
			selectedWard: null,
			addressDetail: '',
			name: '',
			hideDistrict: true,
			hideWard: true,
			hideAddressDetail: true,
			pharmacistChecked: false,
			hidePharmacistAddition: true,
			pharmacistCount: null,
			userNameFormat: null
		}
	},
	computed: {
		...mapState('pharmacies', ['pharmacies']),
		...mapState('countries', ['provinces', 'districts', 'wards'])
	},
	mounted () {
		this.getPharmacies()
	},
	methods: {
		...mapActions('pharmacies', [
			'getPharmacies',
			'createPharmacy',
			'setPharmacy'
		]),
		...mapActions('countries', ['getProvinces', 'getDistricts', 'getWards']),
		addNewPharmacy () {
			this.addNewPharmacyDialog = true
			this.getProvinces()
		},
		cancelAddNewPharmacy () {
			this.addNewPharmacyDialog = false
			this.selectedProvince = null
			this.selectedDistrict = null
			this.selectedWard = null
			this.addressDetail = ''
			this.name = ''
			this.hideDistrict = true
			this.hideWard = true
			this.hideAddressDetail = true
			this.pharmacistChecked = false
			this.hidePharmacistAddition = true
			this.pharmacistCount = null
			this.userNameFormat = null
		},
		async changeProvince (event) {
			await this.getDistricts(this.selectedProvince.province_id)
			this.hideDistrict = false
			this.hideWard = true
			this.hideAddressDetail = true
		},
		async changeDistrict (event) {
			await this.getWards(this.selectedDistrict.district_id)
			this.hideWard = false
			this.hideAddressDetail = true
		},
		changeWard (event) {
			this.hideAddressDetail = false
		},
		confirmPharmacyCreation () {
			this.createPharmacy({
				name: this.name,
				province: this.selectedProvince.province_name,
				district: this.selectedDistrict.district_name,
				ward: this.selectedWard.ward_name,
				addressDetail: this.addressDetail,
				pharmacistGeneration:
          this.pharmacistCount === null || this.userNameFormat === null
          	? null
          	: {
          		count: this.pharmacistCount,
          		userNameFormat: this.userNameFormat
          	}
			}).then((res) => {
				this.addNewPharmacyDialog = false
				this.selectedProvince = null
				this.selectedDistrict = null
				this.selectedWard = null
				this.addressDetail = ''
				this.name = ''
				this.hideDistrict = true
				this.hideWard = true
				this.hideAddressDetail = true
				this.pharmacistChecked = false
				this.hidePharmacistAddition = true
				this.pharmacistCount = null
				this.userNameFormat = null
				this.$toast.add({
					severity: 'success',
					summary: 'Thông báo',
					detail: 'Thêm cơ sở thành công',
					life: 3000
				})
			})
		},
		viewDetail (data) {
			router.push({
				name: 'pharmacy-detail',
				params: { pharmacyId: data.pharmacyId }
			})
			this.setPharmacy(data)
		},
		pharmacistChange (event) {
			if (this.pharmacistChecked) {
				this.hidePharmacistAddition = false
			} else {
				this.hidePharmacistAddition = true
			}
		},
		formatDate (value) {
			return new Date(value).toLocaleDateString('vi-VN', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.pharmacy {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.status-activate {
    background: #c8e6c9;
    color: #256029;
  }

  &.status-inactivate {
    background: #ffcdd2;
    color: #c63737;
  }

  &.status-block {
    background: #feedaf;
    color: #8a5340;
  }
}
.pharmacist-addition {
  margin: 10px 0;
}
.hide-district {
  display: none;
}
.hide-ward {
  display: none;
}
.hide-address-detail {
  display: none;
}
.hide-pharmacist-addition {
  display: none;
}
</style>
