/***
 *
 * @param 기존 CMS
 * @returns
 */

 const AppFilters = (function () {

	var _filters = {
		
		/*전화번호*/
		phone: function (phone) {
			return phone.replace(/[^0-9]/g, '')
						.replace(/(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
		},

		/* 반올림  */
		math: function (param) {
			if(param == 0){
				return "-";
			}
			return Math.round(param);
		},

		/* 특수문자 변형 */
		specialCharacter: function (arr) {
			arr = arr.replace(/&lt;/g, '<');
			arr = arr.replace(/&gt;/g, '>');
			arr = arr.replace(/&quot;/g, '"');
			arr = arr.replace(/&amp;/g, '&');
			arr = arr.replace(/&#10;/g, '\n');
			arr = arr.replace(/&#9;/g, '\t');
			return arr;
		},

		/* input text 제한 */
		comma: function (text) {
			try {
				return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} catch (e) {
				if (text === undefined || text === null || text === "" || text.length === 0) {
					return "-";
				} else {
					return text;
				}
			}
		},

		/* html text 제한 */
		textLimit: function (text, limit) {
			if (text === undefined || text === null || text === "" || text.length === 0) {
				return text;
			} else {
				return text.substr(0, limit);
			}
		},

		/* 파일 사이즈  */
		fileSize: function (size) {
			var result = size + " bytes";
			// optional code for multiples approximation
			var type = ["KB", "MB", "GB"];
			for (var i = 0, reSize = (size / 1024); reSize > 1 && i < type.length; reSize /= 1024, i++) {
				result = reSize.toFixed(3) + " " + type[i];
			}
			return result;
		},

		/* 숫자 한글 표현  */
		numberSize: function (number) {
			var result = number;
			// optional code for multiples approximation
			var type = ["만", "억", "조", "경", "해"];
			for (var i = 0, reSize = (number / 10000); reSize > 1 && i < type.length; reSize /= 10000, i++) {
				result = reSize.toFixed(1) + " " + type[i];
			}
			if (result == null) {
				return '0';
			} else {
				return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			//return result;
		},

		isEmpty: function (data) {
			if (data === undefined || data === null || data === "" || data.length === 0 || (data.constructor == Object && Object.keys(data).length === 0)) {
				if ((typeof data) === "number") {
					return false
				} else {
					return true;
				}
			} else {
				return false;
			}
		},

		/* 빈 데이터 표현 => '-'  */
		emptyText: function (text) {
			if (text === undefined || text === null || text === "" || text.length === 0) {
				return '-';
			} else {
				return text;
			}
		},

		//클라이언트의 현재 일짜와 비교해서 더 작은 지에 대한 여부 확인
		//param - dateText : yyyy-mm-dd (String)
		isSmallerClientDate: function (dateText) {
			const date = new Date(dateText);
			let clientDate = new Date();

			let yyyy = clientDate.getFullYear();
			let mm = clientDate.getMonth() + 1;
			if (mm < 10) {
				mm = "0" + mm;
			}
			let dd = clientDate.getDate();
			if (dd < 10) {
				dd = "0" + dd;
			}
			clientDate = new Date(`${yyyy}-${mm}-${dd}`);

			if (date <= clientDate) {
				return true;
			} else {
				return false;
			}
		},

		/* 인하 수치 5mm */
		DEFAULT_REPAIR_SIZE: -5,

		/* 인하 횟수 => 인하 수치 */
		repairMillimeter: function(repairCount) {
			const newRepairCount = !repairCount ? 0 : Number(repairCount);
			const repairSize = this.DEFAULT_REPAIR_SIZE * newRepairCount;
			return repairSize;
		}
		
	}


	//초기화
	function init() {
        //console.info('commonUtil.js initialized.');
        return _filters;
    }


	return init();

})();

export default AppFilters;

