----------------------
index.html里面需要引入
<script src="js/directives/localStorage.js"></script>
<script src="js/directives/approve-process/ApproveProcess.js"></script>
----------------------
在需要这个指令的页面写入如下指令
<div approve-process idIndex="1" approvers="approvers" configure="approve_configure"></div>
----------------------
在需要这个指令页面的控制器中配置如下
$scope.approve_configure = {
	'displayText' : '审批流程选择',
	'requestParams' : {
		'accesstoken' : $scope.accesstoken,
		'appId' : APPID
	},
	'getApproversUrl' : $window.platformServer + 'approval/inner-position-datas/index',
	'process' : [
	{
		'value' : 'DianZhang',
		'text' : '店长',
		'required' : true
	},{
		'value' : 'ZongHe',
		'text' : '综合',
		'required' : false
	},{
		'value' : 'FaWu',
		'text' : '法务',
		'required' : true
	},{
		'value' : 'CaiWu',
		'text' : '财务',
		'required' : false
	},{
		'value' : 'ZhongXin',
		'text' : '中心',
		'required' : true
	},{
		'value' : 'DaoZhu',
		'text' : '岛主',
		'required' : false
	},{
		'value' : 'DongShiHui',
		'text' : '董事会',
		'required' : false
	}],
	'standard' : 1, //默认是否是标准审批 1标准审批 0 非标准审批
	'standard_display' : true // 是否显示标准的选择
};
--------------------------
输出
approver queue 在 approve_configure.selectedQueue 里面获取 数据格式为 {"id":xx,"name":xx}
