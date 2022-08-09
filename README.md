# スキルチェック

---
## 0.言語とフレームワーク
- フレームワーク => (Flask,React)
- 言語 => (Python,JavaScript or TypeScript)

バックエンドはFlaskでアプリケーションを作成する。<br>
フロントエンドはReactでアプリケーションを作成する。<br>

---
## 1.WEBアプリケーション作成能力
- Reactでフロントエンドアプリケーションを開発できる
- HTTP通信でデータを更新・取得できる

リポジトリ内にあるReactのプロジェクトフォルダ(ui)に[デモページ](http://52.199.224.236:5001/)のようなコンポーネントを作成する。<br>
レイアウトは最低限整っていればよしとする。<br>
以下の機能を実装する。<br>
1. デザインは[Bootstrap](https://react-bootstrap.github.io/)を使用する
2. HTTP通信は[axios](https://www.npmjs.com/package/axios)を使用する
3. ユーザー名＋メールアドレスを入力して"addUser"ボタンでDBに登録する
4. DBのusersテーブルの全てのレコードを"getUser"ボタンで取得してテーブルに表示する
5. 対象のIDを選択＋新しい名前を入力して"modUser"ボタンでDBに登録されている名前を変更する
6. 対象のIDを選択して"delUser"ボタンでDBに登録されているレコードを削除する
7. レスポンスのステータスコードに応じてアラートを表示する
8. POSTしたい内容はクエリパラメータまたはBodyにJSONで記述の好きなほうでよい

---
## 2.REST APIの作成能力
- APIエンドポイント(URI)を設計できる
- GET,POST,DELETEなどのリクエストに対して適切なプログラムを作成できる

バックエンドはFlaskでアプリケーションを作成する。<br>
フロントエンドはReactでアプリケーションを作成する。<br>

---
## 3.DBの操作能力
- DBに対してORMでCRUD処理(Create,Read,Update,Delete)を実行できる

ORMは[SQLAlchemy](https://www.sqlalchemy.org/)を使用する。<br>
SQLAlchemyを使用するならDBの種類は問わない。<br>
参考までにテーブル作成のSQL(PostgreSQL)を以下に示す。<br>
```
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    mail character varying(128) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_mail_key UNIQUE (mail)
)
```

---
## 4.WEBサーバの構築能力
- サーバに作成したアプリケーションをデプロイし、サービスを開始できる




