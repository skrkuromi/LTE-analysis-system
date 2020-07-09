package test

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"server/controller"
	"testing"
)

func TestMain(m *testing.M) {
	code := m.Run()
	os.Exit(code)
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {

	rr := httptest.NewRecorder()

	r := gin.New()

	r.POST("/login", controller.Login)
	r.POST("/register", controller.Register)
	r.ServeHTTP(rr, req)

	return rr
}

// 登录
func TestLogin(t *testing.T) {
	rep, err := http.PostForm("http://localhost:8080/login", url.Values{"username": {"xxy"}, "password": {"12345"}})
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	body, _ := ioutil.ReadAll(rep.Body)
	fmt.Println(string(body))
}

// 注册（失败）
func TestRegister1(t *testing.T) {
	rep, err := http.PostForm("http://localhost:8080/register", url.Values{"username": {"xxy"}, "password": {"1111"}})
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	body, _ := ioutil.ReadAll(rep.Body)
	fmt.Println(string(body))
}
// 注册（成功）
func TestRegister2(t *testing.T) {
	rep, err := http.PostForm("http://localhost:8080/register", url.Values{"username": {"qqq"}, "password": {"1111"}})
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	body, _ := ioutil.ReadAll(rep.Body)
	fmt.Println(string(body))
}