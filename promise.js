// 同步resolve
var promise1 = new Promise(
    (resolve, reject) => {
        resolve("this is promise1 resolve");
    }
).then(
    (msg) => {
        console.log(msg);
    },
    (err) => {
        console.log(err);
    }
);

// 同步reject
var promise2 = new Promise(
    (resolve, reject) => {
        reject("this is promise2 reject");
    }
).then(
    (msg) => {
        console.log(msg);
    },
    (err) => {
        console.log(err);
    }
);

// 同步catch
var promise3 = new Promise(
    (resolve, reject) => {
        reject("this is promise3 reject catch");
    }
).then(
    (msg) => {
        console.log(msg);
    }
).catch(
    (err) => {
        console.log(err);
    }
);

// 异步resolve
var promise4 = new Promise(
    (resolve, reject) => {
        var promise4_1 = new Promise(
            (resolve, reject) => {
                console.log("promise4_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise4_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise4_1);
    }
).then(
    (msg) => {
        console.log(msg);
    },
    (err) => {
        console.log(err);
    }
);

// 链式resolve
var promise5 = new Promise(
    (resolve, reject) => {
        var promise4_1 = new Promise(
            (resolve, reject) => {
                console.log("promise5_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise5_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise4_1);
    }
).then(
    (msg) => {
        console.log(msg);
        var promise5_2 =  new Promise(
            (resolve, reject) => {
                console.log("promise5_2 starts");
                setTimeout(
                    () => {
                        resolve("this is promise5_2 resolve");
                    },
                    2000
                );
            }
        );
        return promise5_2;
    }
).then(
    (msg) => {
        console.log(msg);
        throw new Error();
    }
).catch(
    () => {
        console.log("exception catched after promise5_2 resolved");
    }
);

// 并行+链式promise
var promise6 = new Promise(
    (resolve, reject) => {
        var promiseArr = [];
        for (var i = 0; i < 5; ++i) {
            promiseArr.push(new Promise(
                (resolve, reject) => {
                    console.log(`promise6_${i} starts`);
                    ((index) => { // 闭包处理i
                        setTimeout(
                            () => {
                                console.log(`before promise6_${index} resolved`);
                                resolve(`this is promise6_${index} resolve`);
                            },
                            index * 1000
                        );
                    })(i);
                }
            ));
        }
        resolve(Promise.all(promiseArr));
    }
).then(
    (msgArr) => {
        console.log(`promise6 all resolved ${msgArr}`);
    }
);

// .then()隐式包装resolved Promise
var promise7 = new Promise(
    (resolve, reject) => {
        var promise7_1 = new Promise(
            (resolve, reject) => {
                console.log("promise7_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise7_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise7_1);
    }
).then(
    (msg) => {
        console.log(msg);
        return "promise7 .then()隐式包装resolved Promise";
    },
    (err) => {
        console.log(err);
    }
).then(
    (word) => {
        console.log(word);
    }
);

// .then()显式包装resolved Promise
var promise8 = new Promise(
    (resolve, reject) => {
        var promise8_1 = new Promise(
            (resolve, reject) => {
                console.log("promise8_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise8_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise8_1);
    }
).then(
    (msg) => {
        console.log(msg);
        return Promise.resolve("promise8 .then()显式包装resolved Promise");
    },
    (err) => {
        console.log(err);
    }
).then(
    (word) => {
        console.log(word);
    }
);

// .then()显式包装rejected Promise
var promise9 = new Promise(
    (resolve, reject) => {
        var promise9_1 = new Promise(
            (resolve, reject) => {
                console.log("promise9_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise9_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise9_1);
    }
).then(
    (msg) => {
        console.log(msg);
        return Promise.reject("promise9 .then()显式包装rejected Promise");
    },
    (err) => {
        console.log(err);
    }
).catch(
    (word) => {
        console.log(word);
    }
);

// node在这里才开始执行event loop，timer都在此开始等待调度

