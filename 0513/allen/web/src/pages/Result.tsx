import "./Result.css";

function Result() {
  // 使用URLSearchParams解析当前URL中的查询字符串
  const queryParams = new URLSearchParams(window.location.search);

  // 获取参数'r'的值
  const rValue = queryParams.get("r");

  // 根据'r'的值来确定使用哪张图片
  let imageUrl;
  if (rValue === 'w') {
    imageUrl = 'pass.jpg';  // 'w'对应的胜利图片路径
  } else if (rValue === 'f') {
    imageUrl = 'fail.jpg';  // 'f'对应的失败图片路径
  } else {
    imageUrl = 'fail.jpg';  // 默认图片路径
  }

  const borderClass = rValue === 'l' ? 'borderBlack' : 'border';
  const contentClass = rValue === 'l' ? 'contentBlack' : 'content';
  const resultPageClass = rValue === 'l' ? 'resultPageBlack' : 'resultPage';
  

  return (
    <div className={resultPageClass}>
      
      <div>
        <p>参数 "r" 的值是：{rValue}</p>
      </div>
      <div id="title">Your Result</div>
      <div className={borderClass}>
        <div className="secondColumn">
          <img src={imageUrl} alt="pass" />
          <img className="metal" src="metal3.png" alt="fail" />
        </div>
        <div className={contentClass}></div>
      </div>
    </div>
  );
}

export default Result;
