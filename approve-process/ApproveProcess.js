/**
 * 审批流程选择指令
 * @author wangdi
 */
app.directive('approveProcess', ['$http','$localStorage', function($http, $localStorage) {
	return {
		restrict : 'EA',
		replace : true,
		templateUrl : 'js/directives/approve-process/approve_process.html',
		scope: {
			'configure' : '=configure',
			'idIndex' : '@idindex',
			'approvers' : '=approvers', // 审批流程选项列表
		},
		link : link
	};

	function link (scope, element, attrs) {

		// 打开选择审批人项
		scope.showApproveSelect = function() {
			$('#xkd_approve_process_'+scope.idIndex).modal('show');
			scope.configure.selectedQueue = [];
		}

		getApprovers(scope, $http, $localStorage);

		// 确认选择
		scope.confirmApproveList = function() {
			$('#xkd_approve_process_'+scope.idIndex).modal('hide');
			var approve_process = scope.configure.process;
			if (approve_process && approve_process.length > 0) {
				var _len = approve_process.length;
				for (var i = 0; i < _len; i++) {
					if (approve_process[i].selected_user) {
						if (!scope.configure.selectedQueue) {
							scope.configure.selectedQueue = [approve_process[i].selected_user];
						} else {
							scope.configure.selectedQueue.push(approve_process[i].selected_user);
						}
					}
				}
			}
		}

		// watch 是否是标准审批，改变必填项的选择
		scope.$watch('configure.standard', function(newValue, oldValue) {
			if(newValue != oldValue) {
				var approve_process = scope.configure.process;
				if (approve_process && approve_process.length > 0) {
					var _len = approve_process.length;
					for (var i = 0; i < _len; i++) {
						if (approve_process[i].value == 'DaoZhu') {
							if (scope.configure.standard == 0) {
								approve_process[i].required = true;
							} else {
								approve_process[i].required = false;
							}
							
						}
					}
				}
			}
		}, true);

	}

	function getApprovers (scope, $http, $localStorage) {
		if (isEmptyObject($localStorage.getObject("xkd-approvers"))) {
			return ($http({
				url : scope.configure.getApproversUrl,
				method : 'GET',
				params : {
					'accesstoken' : scope.configure.accesstoken,
				}

			}).then(function(res) {
				scope.approvers = res.data.data; //页面只加载一次审批人选项的数据
				$localStorage.setObject("xkd-approvers",res.data.data);
			})); 
		} else {
			scope.approvers = $localStorage.getObject("xkd-approvers");
		}

		// 控制器的审批流程
		var approve_process = scope.configure.process;
		if (approve_process && approve_process.length > 0) {
			var _len = approve_process.length;
			for (var i = 0; i < _len; i++) {
				approve_process[i].selectes = scope.approvers[approve_process[i].value];
				if (approve_process[i].required) {
					approve_process[i].selected_user = approve_process[i].selectes[0];
				}
			}
		}
	}

	function isEmptyObject(obj) {
		// null and undefined are "empty"
		if (obj == null) return true;
		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0) {
			return false;
		}
		if (obj.length === 0) {
			return true;
		}
		// If it isn't an object at this point
		// it is empty, but it can't be anything *but* empty
		// Is it empty?  Depends on your application.
		if (typeof obj !== "object") {
			return true;
		}

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false;
			}
		}

		return true;
	}

}]);