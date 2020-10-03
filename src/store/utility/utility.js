export const updateObject = (currentObject, objectWithNewProperties) => {
    return {
        ...currentObject,
        ...objectWithNewProperties
    }
}
