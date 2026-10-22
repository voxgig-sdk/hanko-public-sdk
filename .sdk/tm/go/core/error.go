package core

import "encoding/json"

type HankoPublicError struct {
	IsHankoPublicError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
	// The HTTP status, -1 when there was no response.
	Status int
}

func NewHankoPublicError(code string, msg string, ctx *Context) *HankoPublicError {
	return &HankoPublicError{
		IsHankoPublicError: true,
		Sdk:                "HankoPublic",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
		Status:             -1,
	}
}

func (e *HankoPublicError) NotFound() bool {
	return 404 == e.Status
}

func (e *HankoPublicError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *HankoPublicError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"status":  e.Status,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *HankoPublicError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
