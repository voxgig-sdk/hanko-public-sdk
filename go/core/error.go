package core

type HankoPublicError struct {
	IsHankoPublicError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHankoPublicError(code string, msg string, ctx *Context) *HankoPublicError {
	return &HankoPublicError{
		IsHankoPublicError: true,
		Sdk:              "HankoPublic",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HankoPublicError) Error() string {
	return e.Msg
}
