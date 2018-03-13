<template>
  <div class="risk-box">
    <nav class="navbar-box">
      <div class="narbar-top icon-arrow" @click="handleIcon"></div>
      <div class="narbar-top title" @click="handlerisking">{{title}}</div>
      <div class="narbar-top resurvey" v-show="!isShow">
        <span class="reset fr" @click="handleNew">重测</span>
      </div>
    </nav>
    <header class="header-box" v-show="!isShow">
      <span :class="temp===activeIndex?'header-number high-light':'header-number'" v-for="(temp,index) in list" :key="index">{{temp}}
        <span v-if='temp===activeIndex' class="header-icon active-icon"></span>
      </span>
    </header>
    <section v-show="!isShow">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for='(qus,qusIndex) in questions' :key='qusIndex'>
            <div class="section-top">{{qus.title}}</div>
            <div class="section-content">
              <ul class="section-center">
                <li :class="answerArray[qusIndex]===index?'active-answer':''" v-for="(list,index) in qus.value" @click='setActiveQus(qusIndex,index)' :key="index">{{list}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="result">
      <dl v-if="count>=temp.small&&count<temp.big&&isShow" v-for="temp in resultAll" :key="temp.title">
        <dt :class="thisClass"></dt>
        <dd>
          <h2 class="title">{{temp.title}}</h2>
          <p class="describe">{{temp.value}}</p>
          <button class="confirm btnone btn" @click="isSure">确认</button>
          <button class="btn" @click="handleNewrisk" v-show="showIssure">重新评测</button>
        </dd>
      </dl>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "home",
  data() {
    return {
      A: {
        background: "url('../../assets/image/ret_bg_1.png')"
      },
      showIssure: false,
      thisClass: "",
      count: 0,
      tested: false,
      mySwiper: null,
      isShow: false,
      qusIndex: "",
      qusTitle: "",
      answerArray: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      activeClass: {
        headerIcon: true,
        activeIcon: true
      },
      resultAll: [
        {
          small: 300,
          big: 400,
          title: "谨慎型",
          value:
            "您对风险比较敏感，投资时谨慎小心，更注重资产的安全性，确保本金绝对安全"
        },
        {
          small: 400,
          big: 500,
          title: "稳健性",
          value:
            "您对风险有一定认知，愿意承受轻度的投资风险，可以接受收益小幅波动，投资时选择安全稳健的产品"
        },
        {
          small: 500,
          big: 600,
          title: "平衡性",
          value:
            "您是稳健的投资人，风险程度适中，偏向于资产均衡配置，也追求一定的资产利益"
        },
        {
          small: 600,
          big: 700,
          title: "积极性",
          value:
            "您偏向于积极的资产配置，对风险有较高的风险承受能力，投资收益预期相对较高"
        },
        {
          small: 700,
          big: 801,
          title: "进取型",
          value:
            "您的风险承受能力较高，投资时您大胆进取，勇于尝试，资产配置以高风险投资品种为主，追求收益最大化，是资深的投资者"
        }
      ],

      activeIndex: 1,
      title: "风险评测",
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      questions: [
        {
          title: "您的年龄介于：",
          value: ["18-30岁", "31-45岁", "46-60岁", "高于60岁"]
        },
        {
          title: "您的你年收入为：",
          value: [
            "10万元以内",
            "10万元至20万元",
            "20万元至50万元",
            "50万元以上"
          ]
        },
        {
          title: "在您每年可支配收入中，用于金融投资（储蓄存款除外）的比例为：",
          value: ["不超过2万元", "2万元-10万元", "10万元-50万元", "50万元以上"]
        },
        {
          title: "您的最高学历为：",
          value: ["高中及以下", "中专或大专", "本科", "硕士及以上"]
        },
        {
          title: "您的投资知识是：",
          value: [
            "有限：基本没有金融产品方面的知识",
            "一般：对金融产品及其相关风险具有基本的知识和理解",
            "丰富：对金融产品及其相关风险具有丰富的知识和理解",
            "专家：金融领域专家，投资经验丰富"
          ]
        },
        {
          title: "您的投资经验可描述为：",
          value: [
            "除银行储蓄外，基本没有其他投资经验",
            "购买过银行理财，但基金、股票等产品没有购买过",
            "基金、股票都买过，但不是特别了解",
            "投资经验丰富，外汇、期货也有过交易"
          ]
        },
        {
          title:
            "您有多少年投资银行理财、P2P、基金、股票、信托等金融产品的经验：",
          value: ["少于2年", "2至5年", "5至10年", "10年以上"]
        },
        {
          title: "您倾向的投资期限有多久：",
          value: ["1个月以内的天标", "1-3个月", "4-12个月", "12个月以上"]
        },
        {
          title: "以下哪项描述最符合您的投资态度：",
          value: [
            "厌恶风险，不愿意承担任何投资风险",
            "保守投资，尽可能保证本金安全，不在乎收益率较低",
            "寻求资金的较高收益和成长性，愿承担一定的投资风险",
            "实现资产大幅增长，愿承担较大的风险"
          ]
        },
        {
          title:
            "假设有两种投资：投资A预期获得10%的收益，可能承担的损失非常小;投资B预期获得30%的收益，但可能承担较大亏损。您会怎么支配您的资金：",
          value: [
            "全部投资于收益较小且风险较小的A",
            "同时投资于A和B，但大部分资金投资于收益较小且风险较小的A",
            "同时投资于A和B,但大部分资金投资于收益较大且风险较大的B",
            "全部投资于收益较大且风险较大的B"
          ]
        }
      ],
      selectedQus: []
    };
  },
  mounted() {
    console.log("swiper:", this.$swiper);
    for (let val of this.questions) {
      console.log(val);
    }
    this.initSwiper();
  },
  methods: {
    //确认
    isSure() {
      this.showIssure = true;
    },
    //重新评测
    handleNewrisk() {
      this.count = 0;
      this.isShow = false;
      this.activeIndex = 1;
      this.mySwiper.slideTo(0, 1000, false);
      this.answerArray = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    },
    //重测
    handleNew() {
      this.activeIndex = 1;
      this.mySwiper.slideTo(0, 1000, false);
      this.answerArray = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    },
    //返回上一级
    handleIcon() {
      if (this.activeIndex > 1) {
        this.activeIndex = this.activeIndex - 1;
        this.mySwiper.slideTo(this.activeIndex - 1, 1000, false);
      }
    },
    //风险评测 如何一个题目没选，点击风险测评返回到第一个页面。（分页数字改变，页面也改变）
    //点击题目获得分数，根据分数判断类型
    handlerisking() {
      this.tested = true;
      for (let val of this.answerArray) {
        if (val === -1) {
          this.tested = false;
          break;
        }
      }
      if (this.tested) {
        this.isShow = true;
        for (let val of this.answerArray) {
          switch (val) {
            case 0:
              this.count += 30;
              break;
            case 1:
              this.count += 40;
              break;
            case 2:
              this.count += 60;
              break;
            case 3:
              this.count += 80;
              break;
          }
        }
        console.log(this.count);
        //判断是哪一种类型
        if (this.count >= 300 && this.count < 400) {
          this.thisClass = "icon A";
        } else if (this.count >= 400 && this.count < 500) {
          this.thisClass = "icon B";
        } else if (this.count >= 500 && this.count < 600) {
          this.thisClass = "icon C";
        } else if (this.count > 600 && this.count < 700) {
          this.thisClass = "icon D";
        } else {
          this.thisClass = "icon E";
        }
      } else {
        this.activeIndex = 1;
        this.mySwiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
      }
    },
    //点击题目
    setActiveQus(qusIndex, index) {
      Vue.set(this.answerArray, qusIndex, index);
      this.activeIndex = this.activeIndex + 1;
      this.mySwiper.slideTo(this.activeIndex - 1, 1000, false);
      console.log(this.answerArray);
    },
    initSwiper() {
      let _this = this;
      this.mySwiper = new this.$swiper(".swiper-container", {
        on: {
          touchMove: function() {
            _this.activeIndex = this.activeIndex + 1; //切换结束时，告诉我现在是第几个slide
          }
        },
        effect: "coverflow",
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 20,
          stretch: -20,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }
      });
    }
  }
};
</script>
<style lang="scss" src="./index.scss"  scoped>

</style>
