// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    pic1:'http://47.100.212.33:9000/missai/upload/20190916/1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20200416%2F%2Fs3%2Faws4_request&X-Amz-Date=20200416T045201Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f2ffa0681562716cf0ef8b3d3b746fc877e4189ab6dd625784cf0aacff2c613f',
    pic2:'http://47.100.212.33:9000/missai/upload/20190916/2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20200416%2F%2Fs3%2Faws4_request&X-Amz-Date=20200416T045042Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=89ab74101ba26d619f511ab57860b5df539e487c7859cbc49fc0737df3b7b246' ,

    surveyModelList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // console.log(options);
    // //可以在页面 onLoad 中去获取页面 url 中的参数( 下面 onShareAppMessage 函数中配置)
    // if (options.isshare == 1) {
    //   console.log('是分享进入');
    //   this.setData({
    //     'isshare': options.isshare
    //   })
    // }

    var app = getApp() ;
    var  mySurveyModelList=  app.globalData.mySurveyModelList ;
    var  hasSeeMainPage=  app.globalData.hasSeeMainPage ;
    console.log('hasSeeMainPage',hasSeeMainPage);
     //没从主页进入就跳转
      if(!hasSeeMainPage){
        wx.navigateTo({
          url: '../index/index'
        })
      }

    this.setData({
      surveyModelList: mySurveyModelList
     });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    var app = getApp() ;
    app.globalData.hasSeeMainPage = false  ;
    console.info(" app.globalData.hasSeeMainPage="+ app.globalData.hasSeeMainPage);
  },

  onUserOpStatistic: function(e) {
		// if(e.op == 'share') {
    //   var path = e.path;
    //   console.info("path="+path);
		// }
	}
})