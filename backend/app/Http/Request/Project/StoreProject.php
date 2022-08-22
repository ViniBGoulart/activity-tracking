<?php

namespace App\Http\Request\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProject extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|between:2,50',
            'description' => 'between:2,500',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return void
     */
    public function withValidator($validator)
    {
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'msg' => 'Some required field does not filled',
                'status' => false,
                'errors' => $validator->errors(),
                'url' => route('project.store')
            ], 403));
        }
    }
}
