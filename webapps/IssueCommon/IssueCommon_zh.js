define("DS/IssueCommon/IssueCommon_zh",{});define("DS/IssueCommon/assets/nls/IssueCommon",{migration:{upgrade:"该 Widget 已升级，请刷新您的浏览器页面以获得最新版本。"},maturity:{create:"新",assign:"待定",active:"活跃",review:"审查中",closed:"关闭"},priorities:{title:"优先级",low:"低",medium:"中",high:"高",urgent:"紧急"},dates:{seconds:"{number} 秒",minutes:"{number} 分钟",hours:"{number} 小时",days:"{number} 天",months:"{number} 个月",years:"{number} 年"},skeleton:{dueDate:"到期日期：{date}",issueSelection:"已选定 {number} 个问题。",changes:"更改将应用到全部。",lifecycleNotAvailable:"仅能升级或降级具有相同状态的问题。",deletedIssueInTheSelection:"至少有一个选定问题已被删除。",actions:{"delete":"删除选定问题",changeOwner:"更改所有权",close:"关闭问题"},facets:{properties:"属性",relatedObjects:"相关对象",team:"团队",attachments:"附件",comments:"评论",history:"历史记录",documents:"文档"}},lifecycle:{create:"将问题设置为“新建”状态，以指示您开始使用。",assign:"将问题设置为“待定”状态，以允许受托人使用。",active:"将问题设置为“活动”状态，以指示您正在使用。",review:"将问题设置为“审查中”状态，以允许审查您的修复。",closed:"如果所有问题都已修复，请关闭问题。",partial:"对 {number} 个问题的操作失败。",error:"出现错误，请刷新页面并重试。"},create:{title:"问题",titleTemplate:"模板",titleActionCreate:"新",titleActionEdit:"编辑",templateApplySuccess:"模板“{name}”已成功应用。",templateApplyError:"在应用模板“{name}”时出错。",issueApplySuccess:"问题“{title} - {name}”已成功应用。",issueApplyError:"在应用问题“{title} - {name}”时出错。",required:"所请求字段一定不能为空。",creationSuccess:"问题已成功创建。",creationTemplateSuccess:"模板创建成功。",creationFailed:"在创建过程中出错，请再次重试。",validationFailed:"某些字段未正确填充。",promotionSuccess:"问题升级成功。",promotionFailed:"在升级过程中出错。",uploadImagesFailed:"上传图像过程中出错。",createButton:"创建并关闭",createButtonEditMode:"更新",createAnotherButton:"创建",resetButton:"清除",modeToggler:{multiStep:"多步骤",fullView:"完整视图",tooltipMultiStep:"切换到多步骤视图",tooltipFullView:"切换到完整表单视图"},start:{title:"创建问题和模板",cancelButton:"取消",actionPage:{issue:{title:"问题",fromBlank:"新",fromIssue:"复制问题",fromTemplate:"从模板"},template:{title:"模板",fromBlank:"新",fromIssue:"从现有问题",edit:"管理",cloneSuffix:"[DUP]"}}},templateChooser:{title:"选择模板",titleEdit:"管理模板",cancelButton:"取消",closeButton:"关闭",selectButton:"选择",treeList:{tree:"名称",description:"描述",placeholder:"无可用模板。"},iconBar:{title:"模板",create:"新",fromIssue:"从问题新建",clone:"复制",edit:"编辑","delete":"删除"},lastUsed:{title:"最近使用"},preview:{objectCount:"对象",noObject:"无对象"},confirmDelete:{title:"移除模板",text:"是否确定要永久删除选定模板？",okButton:"删除",cancelButton:"取消"},clonePrefix:"复制",errors:{get:"在检索模板时出错，请刷新页面并重试。",remove:"在移除模板时出错，请刷新页面并重试。",save:"在保存模板时出错，请刷新页面并重试。"}},views:{properties:"属性",relatedObjects:"相关对象",team:"团队",documents:"文档",moreAttributes:"更多属性",finalize:"完成"},properties:{labels:{title:"标题",titlePlaceholder:"新问题标题...",titleHelper:"问题的简单单线摘要。",description:"描述",descriptionPlaceholder:"编写描述...",descriptionHelper:"问题的详细描述。提供一系列准备就绪的待用富文本特征。",resolutionRecommendation:"建议的修复",resolutionRecommendationPlaceholder:"应如何操作？",resolutionRecommendationHelper:"用于解释应如何修复该问题的建议。",priorityHelper:"问题的重要性与其他问题有关。",priorityHelperUrgent:"紧急：最高优先级。表示该问题优先于所有其他问题。",priorityHelperHigh:"高：表示该问题将引起其他问题并需要迫切注意。",priorityHelperMedium:"中：表示该问题具有重要影响。",priorityHelperLow:"低：表示该问题的影响相对较小。",dueDate:"到期日期",dueDatePlaceholder:"选择到期日期...",dueDateHelper:"该问题应完成的日期。"}},related:{labels:{reportedAgainst:"报告依据",reportedAgainstHelper:"该关系用于将任何对象链接到问题，以将其识别为“错误”。例如，可以是 3D 对象、文档...",reportedAgainstPlaceholder:"在 3D 中搜索、选择或放置对象，以设置为“报告依据”。",contexts:"上下文",contextHelper:"也称为 DMU 上下文，用于将一个对象附加到问题，以更好地了解该问题。它可以是具有更大结构的其他 3D 对象，从而看到问题的完整上下文。",contextPlaceholder:"搜索或放置对象以设置为上下文。"},search:"搜索并添加对象。",remove:"刷新选定对象。",removeErrorNoSelection:"请选择要移除的某些对象。",addBalloonAvailable:"在 3D 中选取精细元素，以添加到问题中。",addBalloonNotAvailable:"选取 3D 特征仅在“Issue 3D Review”中可用。",alreadyReportedAgainst:"该对象已添加，请选择其他对象。",dropError:"放置的对象不受支持。",contextMultiError:"不支持在上下文中添加多个对象。",treelist:{tree:"标题","ds6w:type":"类型","ds6w:identifier":"名称","ds6wg:revision":"修订版"}},team:{labels:{assignees:"受托人",assigneesHelper:"该关系允许您将人员分派到问题（可以是多个）。现在，人员可以在其列表中查看此问题，并开始使用。",reviewers:"审阅者",participants:"参与者",assignToMe:"分派给我",responsibleOrganization:"责任组织",responsibleOrganizationHelper:"设置此问题的组织责任人（在添加了报告依据后即可自动填充）。"},alreadyAssigned:"{name} 已分派。",removeAssignee:"单击以移除此用户。"},documents:{labels:{images:"图像",imagesHelper:"图像可以通过“Issue 3D Review”应用程序上传或捕获。",imagesPlaceholder:"上传图像可使用屏幕截图按钮来创建并添加新图像。",imagesPlaceholderNotAvailable:"使用“上传”按钮上传图像。",documents:"文档"},uploadImage:"上传图像",screenshotAvailable:"截取屏幕截图",screenshotNotAvailable:"只能从“Issue 3D Review”中访问屏幕截图特征。",remove:"移除选定文档。",removeErrorNoSelection:"请选择要移除的某些文档。"},finalize:{labels:{automation:"自动化",saveAsTemplate:"另存为模板",templateName:"模板名称",templateNamePlaceholder:"用于模板的独特标识符...",templateDescription:"模板描述",templateOverwrite:"具有相同名称的现有模板将被覆盖。"},closeDialogToggle:"在创建后关闭对话框。",promoteToAssignToggle:"请将问题升级到“分配”状态。",saveAsTemplateToggle:"将表单作为可重用模板保存。"}},"delete":{preparing:"正在准备删除...",title:"正在删除 {number} 个问题。",nothing:"没有要删除的问题。","delete":"删除",cancel:"取消",warning:"是否确定要删除此内容？",deletable:"删除以下问题会将其<b>永久</b>移除且无法撤销：",indelible:"以下问题无法删除，<b>您必须拥有处于“新建”状态的问题<b>：",singleSuccess:"已删除 {title}。",multipleSuccess:"已删除 {number} 个问题。",error:"在删除过程中出错，请重试。"},duplicate:{title:"复制 {number} 个问题。",preparing:"正在准备复制...",duplicate:"复制",cancel:"取消",content:"将复制以下问题（<i>复制的处于“新建”状态的问题将归属您所有</i>）：",singleSuccess:"已复制 {title}。",multipleSuccess:"已复制 {number} 个问题。",multipleCopiesSuccess:"{number} 个问题已复制 {multiplication} 次。",error:"在复制过程中出错，请重试。"},attachments:{title:"附件管理器 - {title}",holdIssue:"保留/发行问题",popup:"弹出窗口"},images:{title:"{count} 个图像",actions:{download:"下载",upload:"上传","delete":"删除",popup:"弹出窗口",annotate:"标记"},noImages:"没有要显示的图像。",popup:{title:"图像显示",holdIssue:"保持问题",releaseIssue:"发布问题"},"delete":{cancel:"取消",confirmDeleteTitle:"删除图像",confirmDeleteMessage:"是否确定要永久删除此图像？",imageDisplayDeleteError:"在删除图像时出错",okButton:"确定",pictureDeleted:"图像文件已删除。"},notSupported:"文件格式不受支持。<br>文件：{name}。",errorUpload:"无法上传图像 {name}。",pictureUploaded:"图像文件已上传。"},team:{title:"{count} 个成员",error:{loadContent:"无法检索问题信息。",alreadyAdded:"用户 {name} 已添加到选定问题的 {role} 中。",update:"无法更新问题 {role}",notSupportedDrop:"放置的对象不受支持。",notFound:"未找到结果。"},success:{update:"问题 {role} 已更新。"},filter:{title:"过滤",placeholder:"过滤团队成员"},owner:{title:"负责",changeOwnership:"更改所有权",addSelf:"分派给我"},confirmRemoveTitle:"从“{role}”移除“{user}”",confirmRemoveText:"是否确定要从“{role}”移除“{user}”？",removeOkButton:"移除",removeCancelButton:"取消",assignees:{title:"受托人",add:"添加受托人",save:"保存受托人",propagate:"拓展到所有选定问题",discard:"放弃更改",remove:"从选定问题移除",search:{placeholder:"搜索成员以作为受托人添加..."},addSelf:"分派给我"},reviewers:{title:"审阅者",add:"添加审阅者",save:"保存审阅者",propagate:"拓展到所有选定问题",discard:"放弃更改",remove:"从选定问题移除",search:{placeholder:"搜索成员以作为审阅者添加..."},addSelf:"分派给我"},participants:{title:"参与者",add:"添加参与者",save:"保存参与者",propagate:"拓展到所有选定问题",discard:"放弃更改",remove:"从选定问题移除",search:{placeholder:"搜索成员以作为参与者添加..."},addSelf:"分派给我"},common:{tooltip:"该成员已分派到所有选定问题。",label:"已分派",notLabel:"各不相同"},notSaved:{tooltip:"该成员尚未保存。"},changeLayout:"更改视图布局"},helper:{states:{create:"问题已由请求者创建。",assign:"请求者已分派问题，以允许受托人使用。",active:"问题正在由受托人使用。",review:"建议的解决办法已由问题的创建者审核。",closed:"解决办法已被创建者接受并将问题关闭。"},dialog:{title:"问题管理应用程序 - 帮助",tabStates:"状态",tabShortcuts:"快捷方式",subtitleShortcuts:"热键",subtitleMouseOperation:"鼠标操作",states:{create:"问题已由请求者创建。",assign:"请求者已分派问题，以允许受托人使用。",active:"问题正在由受托人使用。",review:"建议的解决办法已由问题的创建者审核。",closed:"解决办法已被创建者接受并将问题关闭。"},shortcut:{key:{shortcut:{"delete":"删除",arrowUp:"向上",arrowDown:"向下",arrowLeft:"左",arrowRight:"右",enter:"输入",shiftArrow:"Shift + 箭头",ctrlA:"Ctrl + A",ctrlC:"Ctrl + C"},mouse:{ctrlClick:"Ctrl + 单击",shiftClick:"Shift + 单击",doubleClick:"双击"}},detail:{shortcut:{"delete":"删除/拆离项目",arrowUp:"转至上一个项目",arrowDown:"转至下一个项目",arrowLeft:"折叠项目/转至上一个项目",arrowRight:"展开项目/转至下一个项目",enter:"打开属性面板/提交文本输入",shiftArrow:"选择多个项目",ctrlA:"选择所有项目",ctrlC:"复制选定项目"},mouse:{ctrlClick:"选择您单击/取消选择的多个项目",shiftClick:"选择您所单击的所有项目",doubleClick:"打开属性面板/展开或折叠项目"}}}}},taskManager:{cancel:"取消",iconToExit:"在“Issue 3D Review”中取消选取对象"},share:{success:"用于共享 {number} 个问题的 URL 已复制到剪贴板。",info:"可以共享的问题数量上限为 {number} 个。URL 已复制到剪贴板。"}});