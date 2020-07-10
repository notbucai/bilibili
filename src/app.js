/*
 * @Author: bucai
 * @Date: 2020-07-09 19:34:11
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 16:03:11
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
  mid: 84,
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

  defaultConfig.call_num++;
  defaultConfig.mid = config.mid;

  const followingsData = await followings(config.mid, config.type);

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
      const time = (Math.random() * (100) + 20) | 0
      await delay(time);
    } catch (error) {
      console.log('error', error);
      queue.error.push({
        mid: item.mid,
        following_index: i
      });
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

app();
