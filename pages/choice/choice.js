var localData = require('json.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
        surveyModelList:[],
        // surveyModelVo:{},
        // surveyModelListTemp:[],
        showSubmit: false,
        tempStyle:'tempStyle',
        interStyle:'tempStyle',
        total: 38,
        level: "高手",
        scoreAll: 100,
        finishItems: [],
        lastItemId: {}
  },



  kindToggle: function(){ 
       var initJsonData = localData.initJsonData;
       var tempDate = JSON.parse(JSON.stringify(initJsonData));
      // console.log("tempDate ",tempDate) ;
       this.data.surveyModelList = tempDate ;
       this.setData({
          surveyModelList : tempDate 
       });
  },

 


   
  initParas:function(){
    var that = this;
    var initJsonData = localData.initJsonData;
   console.log("initJsonData="+initJsonData);
    var modelList = initJsonData;
    //不同的引用
   // var tempDate = JSON.parse(JSON.stringify(initJsonData));
     var firstItem =  modelList[0];
      console.log(options)
      this.setData({
        surveyModelList: modelList,
        finishItems: new Array(firstItem),
        lastItemId: firstItem.modelId
      });
      //console.log(this.data);
  } ,



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.info('onLoad');
    var that = this;
    var initJsonData = localData.initJsonData;
    var tempDate = JSON.parse(JSON.stringify(initJsonData));
    var initJsonData = tempDate;
  // console.log("initJsonData="+initJsonData);
    var modelList = initJsonData;
    //不同的引用
   // var tempDate = JSON.parse(JSON.stringify(initJsonData));
     var firstItem =  modelList[0];
     
      this.setData({
        surveyModelList: modelList,
        finishItems: new Array(firstItem),
        lastItemId: firstItem.modelId
      });
      console.log(this.data);
  },



  /**
   *  多选
   * @param {*} e 
   */
  checkboxChange:function (e) {
    var values = e.detail.value;
    var answerNums = 2;//e.target.dataset["no"];
    var checkedIds = e.detail.value.slice(0 - answerNums);
  //  console.log('checkedIds',checkedIds);
    var finishItems = this.data.finishItems;
    var modelId = e.target.id;
    for (var i = 0, lenI = finishItems.length; i < lenI; ++i) {
      if (finishItems[i].modelId == modelId) {
        var surveyItems = finishItems[i].surveyItems;
        for (var j = 0, lenJ = surveyItems.length; j < lenJ; ++j) {
          let index = checkedIds.indexOf(surveyItems[j].modelDetailId + "");
              // console.log(checkedIds, surveyItems[j].modelDetailId, index);
          if (index > -1) {
            surveyItems[j].checked = true;
            finishItems[i].chooseRes = surveyItems[j].modelDetailId;
          } else {
            surveyItems[j].checked = false;
          }
        }

      }
    }
    if (modelId == this.data.lastItemId && answerNums == checkedIds.length) {
      if (finishItems.length < this.data.surveyModelList.length) {
        var newItem = this.data.surveyModelList[finishItems.length];
        finishItems.push(newItem);
        this.setData({
          lastItemId: newItem.modelId,
        });
        wx.pageScrollTo({
          scrollTop: 10000,
          duration: 500
        });
      }
    }

    this.setData({
      finishItems: finishItems,
    });
    this.checkSubmitBtn();


   // console.log('values',values);
  },

  
  /**
   *  单选
   * @param {*} e 
   */
  radioChange:function (e) {
    var checkedId = e.detail.value;
    var modelId = e.target.id;
   // console.log('checkedId',checkedId);
   // console.log('modelId',modelId);

    var finishItems = this.data.finishItems;

    for (var i = 0, lenI = finishItems.length; i < lenI; ++i) {
      if (finishItems[i].modelId == modelId) {
        var surveyItems = finishItems[i].surveyItems;
        for (var j = 0, lenJ = surveyItems.length; j < lenJ; ++j) {
          if (surveyItems[j].modelDetailId == checkedId) {
            surveyItems[j].checked = true;
            finishItems[i].chooseRes = surveyItems[j].modelDetailId;
          } else {
            surveyItems[j].checked = false;
          }
        }

      }
    }
    if (modelId == this.data.lastItemId) {
      if (finishItems.length < this.data.surveyModelList.length) {
        var newItem = this.data.surveyModelList[finishItems.length];
        finishItems.push(newItem);
        this.setData({
          lastItemId: newItem.modelId,
        });
        wx.pageScrollTo({
          scrollTop: 20000,
          duration: 500,
          selector: "#bot",
          success:function(){
            //console.log("回到顶部");
          }
        });
      }
    }

    // console.log("Checkbox 发生 change 事件，value 值为：", finishItems);

    this.setData({
      finishItems: finishItems,
    });
     this.checkSubmitBtn();


  },

  /**
   * 判断是否显示提交按钮
   */
  checkSubmitBtn: function () {
    if (!this.data.showSubmit && this.data.finishItems.length == this.data.total) {
      this.setData({
        showSubmit: true,
        interStyle : 'zeroStyle'
      })
    }
  },


  submitData: function () {
    var scoreAll = 0;
    var mySurveyModelList = this.data.finishItems;
    for (var k = 0, lenk = mySurveyModelList.length; k < lenk; ++k) {
      var mySurveyModel = mySurveyModelList[k];
      // console.log('mySurveyModel',mySurveyModel);
      var surveyItems = mySurveyModel.surveyItems;
      for (var i = 0, leni = surveyItems.length; i < leni; ++i) {
        var surveyItem = surveyItems[i];
        if (surveyItem.checked) {
          var score = surveyItem.score;
          scoreAll = scoreAll + score;
        }
      }
    }
    //科斯托拉尼的结论：高于85分：专家；   65分到85分：进步者；            26分到60分：有前途的新手；             25分或低于25分：外行。
    var level = '';
    if (scoreAll <= 25) {
      level = '外行';
    } else if (scoreAll > 25 && scoreAll <= 60) {
      level = '有前途的新手';
    } else if (scoreAll > 65 && scoreAll <= 85) {
      level = '进步者';
    } else if (scoreAll > 85) {
      level = '专家';
    } else {
      level = '一般';
    }
    wx.navigateTo({
      url: '../result/result?level=' + level + '&scoreAll=' + scoreAll,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
          this.setData({
            tempStyle : 'zeroStyle'
          })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.info('onShow');
    // var tempDate = JSON.stringify(this.data.finishItems);
    // console.info('this.data.finishItems='+tempDate);
    // //initParas();
    // if(this.data.finishItems.size>1){
    //   console.info('onShow111');
    //   var that = this;
    //   var initJsonData = localData.initJsonData;
    //  console.log("initJsonData="+initJsonData);
    //   var modelList = initJsonData;
    //    var firstItem =  modelList[0];
    //     this.setData({
    //       finishItems: new Array(firstItem),
    //       lastItemId: firstItem.modelId
    //     });
    // }

   



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // var app = getApp() ;
    // app.globalData.hasSeeMainPage = false  ;
    // console.info(" app.globalData.hasSeeMainPage="+ app.globalData.hasSeeMainPage);
  }
})