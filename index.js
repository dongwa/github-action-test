const targetRepo = 'quasarframework/quasar';
const { data: pushes } = await rest.repos.listCommits({
  owner: context.repo.owner,
  repo: targetRepo,
  since: new Date().toISOString().split('T')[0], // 获取今天的推送
});

const docsChanges = pushes.filter(push => {
  // 检查每个推送的文件是否包含在 'docs/' 目录下
  return push.files.some(file => file.startsWith('docs/'));
});

const commits = [].reduce((res,item)=>{
  return res += item.html_url + '\n'
},'')


console.log(docsChanges)

const res = await github.rest.issues.create({
  owner: context.repo.owner,
  repo: context.repo.repo,
  title: `官方文档发生了一些新的变更，请处理`,
  body: `相关commits:\n ${commits}`
});