"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitejs_hdaddr_1 = require("./../hdaddr");
var vitejs_account_1 = require("./../account");
var vitejs_error_1 = require("./../error");
var vitejs_utils_1 = require("./../utils");
var type_1 = require("../type");
var Wallet = (function () {
    function Wallet(_a, _b) {
        var client = _a.client, mnemonic = _a.mnemonic, _c = _a.bits, bits = _c === void 0 ? 256 : _c, _d = _a.addrNum, addrNum = _d === void 0 ? 1 : _d, _e = _a.lang, lang = _e === void 0 ? type_1.LangList.english : _e, _f = _a.pwd, pwd = _f === void 0 ? '' : _f;
        var _g = _b === void 0 ? {
            addrTotalNum: 10,
            addrStartInx: 0
        } : _b, _h = _g.addrTotalNum, addrTotalNum = _h === void 0 ? 10 : _h, _j = _g.addrStartInx, addrStartInx = _j === void 0 ? 0 : _j;
        var err = vitejs_utils_1.checkParams({ mnemonic: mnemonic, client: client }, ['client'], [{
                name: 'mnemonic',
                func: function (_mnemonic) { return vitejs_hdaddr_1.validateMnemonic(_mnemonic, lang); }
            }]);
        if (err) {
            console.error(new Error(err.message));
            return;
        }
        this._client = client;
        this.addrTotalNum = addrTotalNum;
        var _addrNum = Number(addrNum) && Number(addrNum) > 0 ? Number(addrNum) : 1;
        _addrNum = _addrNum > addrTotalNum ? addrTotalNum : _addrNum;
        this.addrNum = _addrNum;
        this.lang = lang || type_1.LangList.english;
        this.pwd = pwd;
        if (mnemonic) {
            this.mnemonic = mnemonic;
            this.entropy = vitejs_hdaddr_1.getEntropyFromMnemonic(mnemonic, this.lang);
        }
        else {
            var _k = vitejs_hdaddr_1.newAddr(bits, this.lang, this.pwd), entropy = _k.entropy, mnemonic_1 = _k.mnemonic;
            this.mnemonic = mnemonic_1;
            this.entropy = entropy;
        }
        this.addrStartInx = addrStartInx;
        this.addrList = vitejs_hdaddr_1.getAddrsFromMnemonic(this.mnemonic, addrStartInx, this.addrNum, this.lang, this.pwd);
        this.id = vitejs_hdaddr_1.getId(this.mnemonic, this.lang);
        this.activeAccountList = [];
    }
    Wallet.prototype.activateAccount = function (_a, _b) {
        var _this = this;
        var _c = _a === void 0 ? { index: this.addrStartInx } : _a, address = _c.address, _d = _c.index, index = _d === void 0 ? this.addrStartInx : _d;
        var _e = _b === void 0 ? {
            intervals: 2000,
            receiveFailAction: null,
            duration: 5 * 60 * 1000
        } : _b, _f = _e.intervals, intervals = _f === void 0 ? 2000 : _f, _g = _e.receiveFailAction, receiveFailAction = _g === void 0 ? null : _g, _h = _e.duration, duration = _h === void 0 ? 5 * 60 * 1000 : _h;
        index = validAddrParams({ address: address, index: index });
        if (index === null) {
            throw new Error("Don't have this account: address = " + address + " , index = " + index);
        }
        var addrObj = this.addrList[index];
        var activeAccount = new vitejs_account_1.default({
            privateKey: addrObj.privKey,
            client: this._client
        });
        activeAccount.activate(intervals, receiveFailAction);
        if (duration > 0) {
            setTimeout(function () {
                _this.freezeAccount(activeAccount);
            }, duration);
        }
        this.activeAccountList.push(activeAccount);
        return activeAccount;
    };
    Wallet.prototype.freezeAccount = function (activeAccount) {
        if (!this.activeAccountList || !this.activeAccountList.length || !activeAccount) {
            return;
        }
        activeAccount.freeze && activeAccount.freeze();
        var i;
        for (i = 0; i < this.activeAccountList.length; i++) {
            if (this.activeAccountList[i] === activeAccount) {
                break;
            }
        }
        this.activeAccountList.splice(i, 1);
        activeAccount = null;
    };
    Wallet.prototype.addAddr = function () {
        var index = this.addrList.length;
        if (index >= this.addrTotalNum) {
            return null;
        }
        var addrObj = vitejs_hdaddr_1.getAddrFromMnemonic(this.mnemonic, index, this.lang, this.pwd);
        if (!addrObj) {
            return null;
        }
        this.addrList.push(addrObj);
        return addrObj;
    };
    return Wallet;
}());
exports.default = Wallet;
function validAddrParams(_a) {
    var address = _a.address, _b = _a.index, index = _b === void 0 ? this.addrStartInx : _b;
    if (!address && !index && index !== 0) {
        console.error(new Error(vitejs_error_1.paramsMissing.message + " Address or index."));
        return null;
    }
    if (address && !vitejs_hdaddr_1.isValidHexAddr) {
        console.error(new Error("" + vitejs_error_1.addressIllegal.message));
        return null;
    }
    if (!address) {
        return index;
    }
    var i;
    for (i = 0; i < this.addrList.length; i++) {
        if (this.addrList[i].hexAddr === address) {
            break;
        }
    }
    if (i === this.addrList.length) {
        console.error(new Error("" + vitejs_error_1.addressMissing.message));
        return null;
    }
    return i;
}