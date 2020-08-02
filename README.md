# Tavitt-OkChain Project


Test Web Page: 
http://www.greenguardians.org/

# Table of contents

- [Overview](#overview)
- [TodoList](#todolist)
- [TimeCard](#timecard)


# Overview



# TodoList

---7/31更新---

残り作業：  

Signiture関数作成

Send Function  
Exchange Function

8/1〜8/2終了予定

---8/1更新---

予定内容終了


- [x] Create Project
    - [x] env setting (structure, react, redux...)
    - [x] create react repositories
    - [x] connect to bitbucket
    - [x] modify readme file
- [ ] Install Libs 
    - [x] UI libs
    - [x] Functional libs
- [ ] Lanuch Token
    - [x] Tavitt token
- [ ] Create Apis  
    - [x] GET apis
    - [x] POST apis
- [ ] Create UI
    - [x] Import/Create Wallet
    - [x] Signiture
    - [x] Send function 
    - [x] Issue TokenPair
    - [x] Place TokenPair Order 
- [ ] Others
    - [x] Other issues


# Summary

1. http://www.greenguardians.org/　にアクセスし、Homepageには簡単な紹介になります

    ・Tavittの紹介（文章内容は任せます）
    
    ・今回のイベントでは、OKChain上にTavitt coinを発行しました（シンボルはtavitt-128、システムが当てられたもの）
    
    ・tavitt-128コインの送金、残高、履歴。。。コインとしての基本な利用機能を作りました
    
    ・例として、tavitt-128とtoktのTokenPairを作りました（すべてのコインとペアが可能、一つペアが２００００tokt消耗するため今回は一例だけ）
    
    ・Chain上にはtavitt-128_toktという商品になります
    
    ・tavitt-128_tokの購入機能を作成しました
    
2. http://www.greenguardians.org/account　サイドバーからAccountページにアクセスしますとウォレットインポート画面になります

    ・本来にはインポートするものがプライベートキーですが、ローカルには暗号化してから保存しないといけないので、今回は簡単にアドレスのインポートになります

    ・アドレスで、送金、Exchange以外の動作が全部できます、主に、残高＆履歴の確認になります

    ・テスト用のアドレスをコピーしてインポートするとウォレットの残高が見れます
    
    ・Show All Tokenボタンは残高が０のコインも表示します、チェーン上すべてのコインがわかります

    ・Removeボタン押すと、ローカルからアドレスを削除します。（Logoutの感じ）
    
3. http://www.greenguardians.org/transaction サイドバーからAccountページにアクセスしますと送金、ExchangOrder実行の画面になります

    ・Send は　送金先と金額（数字だけ入力可能）とTokenの名前（残高があるTokenだけ表示する）入力し、
    Sendボタンをおし、一回確認して送金になっています。入力内容必須
    テスト用受取のアドレスは：okchain17wydevafdqc9fxj8q9zlnd0ay9r32htplz7qzrを準備しました
    
    ・送金履歴はしたのリストになります、重要な内容だけピックアップして表示しています
    
    ・Dex はToken Pairを選択し、Orderの価格と数量を入力して、同じくEXCHANGEボタンで確認してから、実行します。内容がすべて必須です
    
    ・DexはOrder Placeだけ作りました、機能はまだ完全にわかってないため、ここまでしかできていないです。多分他のユーザーの購入待ちっていう感じですね。Dexだったら、値段が変更など、いろいろある気がします。
    
    ・送金履歴はTabで普通の送金とExchangeのオーダーを分けました。内容が違いますので、ORDER HISTORYをクリックするとオーダーの確認ができます。
    

3. http://www.greenguardians.org/projects　Chain上のすべてのTokenリストで、Token名とシンボル、説明文をリストしました。

    ・テストトークンで、価値がある内容がそれほどないけど、形的には他プロジェクトと連携している感じです。ここで他プロジェクトの情報交換などは、サーバーが必要になってくるので、リストだけし、アイディアになります。
    
    ・送金＆オーダー時入力するmnemonic words : 
    library valid throw garden gym saddle very recall helmet goddess seminar later
   
    mnemonic wordsはPrivate Keyと同じ感じです、mnemonic wordsからPrivate Key生成できる
    
# TimeCard


| Date     | Time    | Work Content |
| --------|---------|-------|
| 2020/7/6 | 2h | 準備作業：プロジェクト作成、環境設定など    |
| 2020/7/7 | 2h | bitbucket git settings  API、Docを確認する、Fetch API試作    |
| 2020/7/8 | 1h | Okchain担当者と連絡し、資料の確認などを行う（疑問があるAPIなど）    |
| 2020/7/9 | 2h | Okchainアカウント作成、Wallet作成、Testnet Currencies確認　|
| 2020/7/10~31 |  | http://www.greenguardians.org/　|


後半の時間は把握しにくくなりました、OKChainのチームとWeChatで交流するなどが多かったので
全体的には、半月の仕事の量かな。。。

# 今後の予定

様子見