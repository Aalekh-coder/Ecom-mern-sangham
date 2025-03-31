import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText,isBtnDisabled }) => {

    function renderInputsByComponentType(getComponentItem) {
        let element = null;
        const value = formData[getComponentItem.name] || "";

        switch (getComponentItem.componentType) {
            case "input":
                element = (<Input name={getComponentItem.name} placeholder={getComponentItem.placeholder} id={getComponentItem.name} type={getComponentItem.type} value={value} onChange={e => setFormData({ ...formData, [getComponentItem.name]: e.target.value })} />

                )
                break;

            case "select":
                element = (
                    <Select value={value} onValueChange={(value)=> setFormData({...formData, [getComponentItem.name]: value})}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getComponentItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getComponentItem.options && getComponentItem.options.length > 0 ? getComponentItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                            }
                        </SelectContent>

                    </Select>

                )
                break;
            case "textarea":
                element = (<Textarea name={getComponentItem.name} placeholder={getComponentItem.placeholder} id={getComponentItem.id} type={getComponentItem.type} value={value} onChange={e => setFormData({ ...formData, [getComponentItem.name]: e.target.value })} />

                )
                break;
            default:
                element = (<Input name={getComponentItem.name} placeholder={getComponentItem.placeholder} id={getComponentItem.name} type={getComponentItem.type} value={value} onChange={e => setFormData({ ...formData, [getComponentItem.name]: e.target.value })}/>

                )
                break;

        }
        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map((controlItem) => <div className='grid w-full gap-1.5' key={controlItem.name}>
                        <Label className="mb-1">{controlItem?.label}</Label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>
            <Button disabled={isBtnDisabled} className="mt-2 w-full" type="submit">{buttonText || "submit"}</Button>
        </form>
    )
}

export default CommonForm 