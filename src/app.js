/*
 * @Author: bucai
 * @Date: 2020-07-09 19:34:11
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 23:31:29
 * @Description: 
 */
const { user, upstat, followings } = require('./source');
const handles = require('./handles');
const { User } = require('./entitys/user');
const queue = {
  error: [],
  next: []
};
const defaultConfig = {
  mid: 2216,
  following_index: 0,
  call_num: 0,
};

function saveConfig (config) {
  console.table([config]);

}

function delay (time) {
  return new Promise((ok) => {
    setTimeout(() => {
      ok();
    }, time);
  })
}

async function app (config = defaultConfig) {

  let followingsData;
  try {
    followingsData = await followings(config.mid, config.type);
  } catch (error) {
    console.log('error', error);
    await delay(5 * 1000);
    return app();
  }

  defaultConfig.call_num++;
  defaultConfig.mid = config.mid;

  for (let i = config.following_index; i < followingsData.list.length; i++) {
    const item = followingsData.list[i];
    queue.next.push(item);
    try {
      await handles.hasUser(item.mid);
    } catch (error) {
      console.log('error', error);
      continue;
    }
    try {
      const userData = await user(item.mid);
      const _user = new User(userData);
      await handles.saveUser(_user);
      defaultConfig.following_index = i;
      defaultConfig.current = item.mid;
      saveConfig(defaultConfig);
      const time = (Math.random() * (1200) + 200) | 0
      await delay(time);
    } catch (error) {
      console.log('error', error);
      queue.error.push({
        mid: item.mid,
        following_index: i
      });
      await delay(30 * 1000);
    }
  }
  console.log('app end');
  queue.next = [...new Set(queue.next)];
  const next = queue.next.pop();
  if (!next) return console.log('结束');

  defaultConfig.mid++;
  // followings / followers
  config.type = next.official_verify.type === 1 ? 0 : 1;
  defaultConfig.following_index = 0;

  console.log('next', defaultConfig.mid, config.type);
  app(defaultConfig);
}

setTimeout(() => {
  app();
}, 20*60*1000);
