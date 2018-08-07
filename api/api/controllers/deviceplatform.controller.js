exports.getLeftMenu = (req, res, next) => {
    res.status(200).json({
        "data": [
            {
                "childs": [
                    {
                        "childs": [
                            {
                                "id": 400,
                                "menuLink": "#device-manage/com-record",
                                "menuName": "综合备案",
                                "orderValue": 1,
                                "selected": false
                            }
                        ],
                        "id": 399,
                        "menuLink": "#11",
                        "menuName": "综合备案",
                        "orderValue": 11,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 406,
                                "menuLink": "#device-manage/spot-manage",
                                "menuName": "点位管理",
                                "orderValue": 1,
                                "selected": false
                            }
                        ],
                        "id": 405,
                        "menuLink": "#13",
                        "menuName": "点位管理",
                        "orderValue": 13,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 408,
                                "menuLink": "#device-manage/road-manage",
                                "menuName": "道路管理",
                                "orderValue": 1,
                                "selected": false
                            },
                            {
                                "id": 409,
                                "menuLink": "#device-manage/cross-manage",
                                "menuName": "路口路段管理",
                                "orderValue": 2,
                                "selected": false
                            }
                        ],
                        "id": 407,
                        "menuLink": "#14",
                        "menuName": "道路管理",
                        "orderValue": 14,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 411,
                                "menuLink": "#device-manage/firm-manage",
                                "menuName": "厂商管理",
                                "orderValue": 1,
                                "selected": false
                            }
                        ],
                        "id": 410,
                        "menuLink": "#15",
                        "menuName": "厂商管理",
                        "orderValue": 15,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 413,
                                "menuLink": "#device-manage/control-upload",
                                "menuName": "集成指挥上传管理",
                                "orderValue": 1,
                                "selected": false
                            },
                            {
                                "id": 414,
                                "menuLink": "#device-manage/interface-manage",
                                "menuName": "集成指挥接口管理",
                                "orderValue": 2,
                                "selected": false
                            }
                        ],
                        "id": 412,
                        "menuLink": "#16",
                        "menuName": "配置管理",
                        "orderValue": 16,
                        "selected": false
                    }
                ],
                "id": 395,
                "menuLink": "#/",
                "menuName": "设备管理",
                "orderValue": 1,
                "selected": false
            },
            {
                "childs": [
                    {
                        "childs": [
                            {
                                "id": 398,
                                "menuLink": "#performance-monitor/operation-monitor",
                                "menuName": "设备运行监控",
                                "orderValue": 1,
                                "selected": false
                            }
                        ],
                        "id": 397,
                        "menuLink": "#20",
                        "menuName": "设备运行监控",
                        "orderValue": 1,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 476,
                                "menuLink": "#performance-monitor/map-integration",
                                "menuName": "地图集成应用",
                                "orderValue": 1,
                                "selected": false
                            }
                        ],
                        "id": 475,
                        "menuLink": "#21",
                        "menuName": "地图集成应用",
                        "orderValue": 2,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 496,
                                "menuLink": "#performance-monitor/system-monitor",
                                "menuName": "服务器运行监控",
                                "orderValue": 4,
                                "selected": false
                            }
                        ],
                        "id": 495,
                        "menuLink": "#22",
                        "menuName": "系统运行监控",
                        "orderValue": 4,
                        "selected": false
                    }
                ],
                "id": 396,
                "menuLink": "#2",
                "menuName": "运行监控",
                "orderValue": 2,
                "selected": false
            },
            {
                "childs": [
                    {
                        "childs": [
                            {
                                "id": 480,
                                "menuLink": "#fault-warning/fault-manage",
                                "menuName": "设备故障管理",
                                "orderValue": 1,
                                "selected": false
                            }
                        ],
                        "id": 478,
                        "menuLink": "#30",
                        "menuName": "故障告警管理",
                        "orderValue": 1,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 481,
                                "menuLink": "#fault-warning/identify-analyze",
                                "menuName": "号牌识别率分析",
                                "orderValue": 1,
                                "selected": false
                            },
                            {
                                "id": 483,
                                "menuLink": "#fault-warning/delay-analyze",
                                "menuName": "传输延迟分析",
                                "orderValue": 2,
                                "selected": false
                            },
                            {
                                "id": 484,
                                "menuLink": "#fault-warning/data-missing-analyze",
                                "menuName": "数据缺失分析",
                                "orderValue": 3,
                                "selected": false
                            }
                        ],
                        "id": 479,
                        "menuLink": "#31",
                        "menuName": "数据质量诊断",
                        "orderValue": 2,
                        "selected": false
                    },
                    {
                        "childs": [
                            {
                                "id": 510,
                                "menuLink": "#fault-warning/collection-monitor",
                                "menuName": "采集量异常检测",
                                "orderValue": 1,
                                "selected": false
                            },
                            {
                                "id": 511,
                                "menuLink": "#fault-warning/registion-verification",
                                "menuName": "注册信息验证",
                                "orderValue": 2,
                                "selected": false
                            }
                        ],
                        "id": 509,
                        "menuLink": "#32",
                        "menuName": "数据异常监测",
                        "orderValue": 3,
                        "selected": false
                    }
                ],
                "id": 477,
                "menuLink": "#3",
                "menuName": "故障告警",
                "orderValue": 3,
                "selected": false
            },
            {
                "childs": [
                    {
                        "childs": [
                            {
                                "id": 531,
                                "menuLink": "#device-maintenance/pending-work",
                                "menuName": "待处理工单",
                                "orderValue": 1,
                                "selected": false
                            },
                            {
                                "id": 532,
                                "menuLink": "#device-maintenance/done-work",
                                "menuName": "已办结工单",
                                "orderValue": 2,
                                "selected": false
                            }
                        ],
                        "id": 530,
                        "menuLink": "#63",
                        "menuName": "工单闭环管理",
                        "orderValue": 1,
                        "selected": false
                    }
                ],
                "id": 529,
                "menuLink": "#62",
                "menuName": "设备运维",
                "orderValue": 4,
                "selected": false
            },
            {
                "childs": [
                    {
                        "childs": [
                            {
                                "id": 514,
                                "menuLink": "#statistical-analysis/comprehensive-statistics",
                                "menuName": "设备综合统计",
                                "orderValue": 1,
                                "selected": false
                            },
                            {
                                "id": 515,
                                "menuLink": "#statistical-analysis/access-rate-statistics",
                                "menuName": "设备接入率统计",
                                "orderValue": 2,
                                "selected": false
                            },
                            {
                                "id": 516,
                                "menuLink": "#statistical-analysis/online-rate-statistics",
                                "menuName": "设备在线率统计",
                                "orderValue": 3,
                                "selected": false
                            },
                            {
                                "id": 517,
                                "menuLink": "#statistical-analysis/failure-rate-statistics",
                                "menuName": "设备故障率统计",
                                "orderValue": 4,
                                "selected": false
                            }
                        ],
                        "id": 513,
                        "menuLink": "#61",
                        "menuName": "设备统计",
                        "orderValue": 1,
                        "selected": false
                    }
                ],
                "id": 512,
                "menuLink": "#6",
                "menuName": "统计分析",
                "orderValue": 6,
                "selected": false
            }
        ],
        "flag": true
    })
}

exports.getLoginInfo = (req, res, next) => {
    res.status(200).json(
        {
            "flag": true,
            "data": {
                "accountName": "cs2",
                "orgCode": "340100000000",
                "orgId": 23,
                "orgName": "合肥市公安局交通警察支队",
                "systemName": "设备智慧管理",
                "userId": 124,
                "userName": "测试二"
            }
        }
    )
}