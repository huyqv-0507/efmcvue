<template>
    <div class="layout-footer">
        <div class="p-grid">
            <div class="p-col-12  p-lg-4">
                <div class="p-grid">
                    <div class="p-col-6 ">
                        <span class="footer-menutitle">DANH MỤC</span>
                        <ul>
                            <li><router-link to="/">Cơ sở</router-link></li>
                            <li><router-link to="/">Danh mục thuốc</router-link></li>
                            <li><router-link to="/">Thiết lập giá</router-link></li>
                            <li><router-link to="/">Kiểm kho</router-link></li>
                        </ul>
                    </div>
                    <div class="p-col-6">
                        <span class="footer-menutitle"></span>
                        <ul>
                            <li><router-link to="/">Lịch sử mua thuốc</router-link></li>
                            <li><router-link to="/">Quản lý nợ</router-link></li>
                            <li><router-link to="/">Bán hàng</router-link></li>
                            <li><router-link to="/">Quản lý dược sĩ</router-link></li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="p-col-12 p-md-6 p-lg-3">
                <span class="footer-menutitle">LIÊN LẠC</span>
                <ul>
                    <li>{{user.phone}}</li>
                    <li>{{user.address}}</li>
                </ul>
            </div>
            <div class="p-col-12 p-md-6 p-lg-5">
                <span class="footer-menutitle">BẢNG TIN</span>
                <span class="footer-subtitle">Đăng ký để nhận thêm thông tin về những tính năng mới</span>
                    <div class="newsletter-input">
                        <InputText type="text" placeholder="Địa chỉ email" />
                        <Button type="button" label="Tham gia" class="p-button-secondary"></Button>
                    </div>
            </div>
            <div class="p-col-12">
                <div class="footer-bottom">
                    <h4>e-famedic</h4>
                    <h6>Copyright Ⓒ efamedic Informatics</h6>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'AppFooter',
	computed: {
		...mapState('users', ['user'])
	}
}
</script>
