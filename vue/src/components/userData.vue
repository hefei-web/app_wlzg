<template>
  <div class="userData" @click="closed">
    <mt-header title="个人资料">
      <span slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <section class="info-box mb-10">
      <div class="info-row">
        <span class="info-row-title">头像</span>
        <span class="avator-sm">
          <img :src="photo" alt />
        </span>
      </div>
      <div class="info-row">
        <span class="info-row-title">昵称</span>
        <input @blur="nickMsg" class="info-row-text" type="text" maxlength="12" v-model="nickname" />
      </div>
      <div class="info-row">
        <span class="info-row-title">性别</span>
        <span class="info-row-text" v-text="gender"></span>
        <div class="info-row-right info-right-sex">
          <span :class="gender1?'sex-active':''" @click="changeSex(1)">男</span>
          <span :class="gender0?'sex-active':''" @click="changeSex(0)">女</span>
        </div>
      </div>
      <div class="info-row">
        <span class="info-row-title">邮箱</span>
        <input @blur="emailMsg" class="info-row-text" type="email" v-model="email" />
      </div>
      <div class="info-row" @click.stop="pickerValue">
        <span class="info-row-title">生日</span>
        <span class="info-row-text" v-text="age"></span>
        <mt-datetime-picker
          type="date"
          ref="picker"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleConfirm"
          :startDate="startDate"
        ></mt-datetime-picker>
      </div>

      <div class="info-row" @click.stop="ShouPup">
        <span class="info-row-title">所在地</span>
        <span class="info-row-text" v-text="address" />
        <!--         <span class="info-row-text">北京市,市辖区</span> -->
        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade"
          modal="true"
          closeOnClickModal="true"
          position="bottom"
        >
          <mt-picker :slots="slots" @change="onValuesChange" style="width: 7.6rem;" showToolbar>
            <div class="picker-toolbar-title">
              <div class="usi-btn-cancel" @click="cancle">取消</div> 
              <div class>请选择地区</div>
              <div class="usi-btn-sure" @click="editSave">确定</div>
            </div>
          </mt-picker>
        </mt-popup>
      </div>
      <div class="info-row">
        <span class="info-row-title">个性签名</span>
        <input class="info-row-text" type="text" v-model="sign" />
      </div>
      <div class="info-row">
        <span class="info-row-title">密码</span>
        <input
          @blur="pwMsg"
          class="info-row-text"
          type="password"
          minlength="6"
          maxlength="12"
          v-model="password"
        />
      </div>

      <mt-button size="large" @click="changeData">提交修改</mt-button>
    </section>
  </div>
</template>
<script>
import { city, privinceList, cityList, districtList } from "../assets/add.js";
import Qs from "qs";
export default {
  data() {
    return {
      isLogin: false,
      gender: "",
      gender1: false,
      gender0: false,
      nickname: "",
      age: "",
      address: "",
      sign: "",
      photo: "",
      email: "",
      password: "",
      popupVisible: false,
      startDate: new Date("1968-01-01"),
      myprivinceList: [], //省的数组
      mycityList: [], //省对应城市的数组
      mydistrictList: [], //区或者县的数组
      areapicker: "",
      nickpass: 1,
      pwpass: 1,
      emailpass: 1,
      slots: [
        {
          flex: 1,
          values: privinceList, //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          pider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: cityList,
          className: "slot3",
          textAlign: "center"
        },
        {
          pider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: districtList,
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressPrivince: "", //最后选中的省或直辖市
      myAddressCity: "", //最后选中的城市
      myAddressDistrict: "", //最后选中的区或者县
      showToolbar: true
    };
  },
  watch: {
    myAddressPrivince(oldval, newval) {
      //省数据变化后，更新市的显示数据
      this.areapicker.setSlotValues(2, this.mycityList);
      this.areapicker.setSlotValue(2, this.mycityList[0]);
    },
    myAddressCity(oldval, newval) {
      //城市的值改变后，重置区县的数据
      this.areapicker.setSlotValues(4, this.mydistrictList);
      this.areapicker.setSlotValue(4, this.mydistrictList[0]);
    },
    myAddressDistrict(oldval, newval) {}
  },
  methods: {
    pickerValue() {
      this.$refs.picker.open();
    },
    closed() {
      this.$refs.picker.close();
      this.popupVisible = false;
    },
    handleConfirm(data) {
      this.age =
        data.getFullYear() +
        "年" +
        (data.getMonth() + 1) +
        "月" +
        data.getDate() +
        "日";
      this.$refs.picker.close();
    },
    back() {
      this.$router.go(-1);
    },
    quit() {
      this.$messagebox
        .confirm("确认退出登录？")
        .then(action => {
          localStorage.removeItem("Flag");
          localStorage.removeItem("userid");
          this.$store.dispatch("userid", undefined);
          this.$router.push("/login");
        })
        .catch(err => {});
    },
    changeSex(n) {
      if (n == 1) {
        this.gender = "男";
        this.gender1 = true;
        this.gender0 = false;
      } else {
        this.gender = "女";
        this.gender1 = false;
        this.gender0 = true;
      }
    },
    ShouPup() {
      this.popupVisible = true;
    },
    cancle() {
      console.log(123);
      this.popupVisible = false;
       this.$refs.picker.close();
    }, 
    editSave(oldval, newval) {
      //省数据变化后，更新市的显示数据
      this.areapicker.setSlotValues(2, this.mycityList);
      this.areapicker.setSlotValue(2, this.mycityList[0]);
      //城市的值改变后，重置区县的数据
      this.areapicker.setSlotValues(4, this.mydistrictList);
      this.areapicker.setSlotValue(4, this.mydistrictList[0]);
      this.address =
        this.myAddressPrivince + this.myAddressCity + this.myAddressDistrict;
      this.popupVisible = false;
    },
    onValuesChange(picker, values) {
      this.areapicker = picker;
      this.mycityList = [];
      this.mydistrictList = [];
      var chooseList = city.filter(function(item) {
        return item.name == values[0];
      });
      if (chooseList[0].sub) {
        for (var item of chooseList[0].sub) {
          this.mycityList.push(item.name);
        }
        //获取非直辖市数据
        if (chooseList[0].sub.length > 1) {
          var choosedisList = [];
          if (this.mycityList.indexOf(values[2]) > -1 && values[2] != "其他") {
            choosedisList = chooseList[0].sub.filter(function(item) {
              return item.name == values[2];
            });
            for (var item of choosedisList[0].sub) {
              this.mydistrictList.push(item.name);
            }
          } else {
            this.mydistrictList = [];
          }
        }
        //获取直辖市数据
        else {
          for (var item of chooseList[0].sub[0].sub) {
            this.mydistrictList.push(item.name);
          }
        }
      }
      this.myAddressPrivince = values[0];
      this.myAddressCity = values[2];
      this.myAddressDistrict = values[4];
    },
    changeData() {
      if (this.pwpass == 1 && this.nickpass == 1 && this.emailpass == 1) {
        var userid = localStorage.getItem("userid");
        var gender;
        if (this.gender == "男") {
          gender = 1;
        } else {
          gender = 0;
        }
        var data = {
          address: this.address,
          nickname: this.nickname,
          gender,
          age: this.age,
          sign: this.sign,
          userid,
          email: this.email,
          password: this.password
        };
        if (userid) {
          this.axios({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            url: "/travel/changeData",
            data: Qs.stringify(data)
          }).then(result => {
            console.log(result.data);
            if (result.data.code == "1") {
              this.$toast("修改成功");
              this.$router.push("/user");
            } else if (result.data.code == "-1") {
              this.$toast("修改失败");
            }
          });
        }
      } else if (this.nickpass !== 1) {
        this.$toast("昵称不能为空");
      } else if (this.pwpass !== 1) {
        this.$toast("密码在6到12位之间");
      } else if (this.emailpass !== 1) {
        this.$toast("邮箱输入错误");
      }
    },
    pwMsg() {
      if (!this.password.trim()) {
        //this.$toast("密码不能为空");
        this.pwpass = 0;
      } else if (!/^\w{6,12}$/.test(this.password)) {
        //this.$toast("密码在6到12位之间");
        this.pwpass = 0;
      } else {
        this.pwpass = 1;
      }
    },
    nickMsg() {
      if (!this.nickname.trim()) {
        //this.$toast("昵称不能为空");
        this.nickpass = 0;
      } else {
        this.nickpass = 1;
      }
    },
    emailMsg() {
      if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
          this.email
        )
      ) {
        //this.$toast("邮箱格式不正确");
        this.emailpass = 0;
      } else {
        this.emailpass = 1;
      }
    },
    load(){
      
    }
  },
  created() {
    //获取用户信息
    if (localStorage.getItem("userid")) {
      this.$store.dispatch("userData");
      var userData = this.$store.getters.userData;
      console.log(userData.userData);
      var {
        nickname,
        gender,
        age,
        address,
        sign,
        photo,
        email,
        password
      } = userData.userData;
      console.log(nickname, gender, age, address, sign, photo);
      this.nickname = nickname;
      this.age = age;
      this.address = address;
      this.sign = sign;
      this.photo = this.host+photo;
      this.email = email;
      this.password = password;
      if (gender == "1") {
        this.gender = "男";
        this.gender1 = true;
        this.gender0 = false;
      } else {
        this.gender = "女";
        this.gender1 = false;
        this.gender0 = true;
      }
    }
  }
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter,
.v-leave-to {
  transform: translateX(100%);
}
.userData {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  background-color: #f9f9f9;
}

.mint-header {
  background-color: #f7c902;
  margin-bottom: 0.2rem;
}

/*基本信息*/
.info-row {
  position: relative;
  height: 1.04rem;
  line-height: 1.04rem;
  padding-left: 0.4rem;
  border-bottom: 1px solid #f0ebeb;
}
.info-row span {
  vertical-align: middle;
}
.info-row input {
  font-weight: 600;
  color: #474747;
  background: #f9f9f9;
}
.info-row-title {
  display: inline-block;
  width: 1.4rem;
  font-size: 0.28rem;
  color: #b8b8b8;
  text-align: left;
}
.avator-sm {
  display: inline-block;
  width: 0.66rem;
  height: 0.66rem;
  line-height: 100%;
  border-radius: 0.66rem;
  overflow: hidden;
}
.avator-sm img {
  width: 100%;
  height: 100%;
}
.info-row-text {
  font-size: 0.28rem;
  color: #474747;
}
.info-right-sex span {
  display: inline-block;
  width: 0.64rem;
  height: 0.42rem;
  line-height: 0.42rem;
  text-align: center;
  background: #efefef;
  border-radius: 0.06rem;
  font-size: 0.28rem;
  color: #ffffff;
}
.sex-active {
  background: #f7c902 !important;
}
.info-sex-man {
  margin-right: 0.25rem;
}
.info-row-right {
  position: absolute;
  top: 0;
  right: 0.36rem;
}
.info-row-right img {
  width: 0.12rem;
  height: 0.22rem;
}
.info-right-phone span {
  display: inline-block;
  width: 1.46rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.28rem;
  color: #ffffff;
  background: #f7c902;
  text-align: center;
  border-radius: 0.06rem;
  font-weight: 500;
}
.mint-button--large {
  margin: 0.5rem auto;
  width: 50%;
  background: #f7c902;
  color: #fff;
  border-radius: 0.1rem;
}
.picker-toolbar-title {
  display: flex;
  justify-content: space-between;
  height: 45px;
  font-size: 0.3rem;
  margin: 0 0.5rem;
}
.usi-btn-cancel {
  color: #666;
}
.usi-btn-sure {
  color: #1e83d3;
}
</style>
