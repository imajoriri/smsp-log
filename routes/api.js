var express = require('express');
var router = express.Router();
var { connection } = require('./../mysql.js');

// 飛んできたデータをlogsに保存。
// skill_nameを元にskillsよりskillオブジェクトを取得
// logsにデータを保存 >> {id, skill_id, skill_user_id,, handler_name, created_at }
// req = { skill_name, handler_name, skill_user_id }
// curl localhost:3000/api/handlerSet -X POST -H "Content-Type: application/json" -d '{"skill_name": "test", "handler_name": "sample handler", "skill_user_id": "samle user id"}'
router.post('/handlerSet', async (req, res, next) => {
  // request
  var skillName = req.body.skill_name;
  var handler_name = req.body.handler_name;
  var skill_user_id = req.body.skill_user_id;

  // データ取得
  var skills = await whereSkillByName(skillName).catch( (err) => {
    res.send(err);
  });
  // スキルが見つからなかったら保存しないで返す。
  if(skills.length === 0){
    res.send(`cannot find ${skillName} skill`);
  }
  var skill = skills[0];

  // 保存する値のオブジェクト
  var logsData = {
    skill_id: skill.id,
    skill_user_id: skill_user_id,
    handler_name: handler_name,
  }

  // logs保存
  insertLogs(logsData);

  res.send(logsData);
});

function whereSkillByName(skill_name){
  return new Promise( (resolve, reject) => {
    connection.query('select * from skills where `name` = ?', [skill_name], function (err, results, fields) {
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

function insertLogs(logsData){
  connection.query('insert into logs set ?', logsData, (err, results, fields) => {
    console.log(err);
  });
  return "";
}



module.exports = router;
