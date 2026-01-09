const IsEmptyOrNull = (value: any) => typeof value === 'undefined' || null === value || '' === value

export const AND = "And";
export const BEGINS_WITH = "BeginsWith";
export const BOOLEAN = "Boolean";
export const COLLAPSE = "Collapse";
export const CONTAINS = "Contains";
export const CURRENT_USER_GROUPS = "CurrenUserGroups";
export const DATE_RANGES_OVERLAP = "DateRangesOverlap";
export const DATETIME = "DateTime";
export const EQ = "Eq";
export const FIELD_REF = "FieldRef";
export const GEQ = "Geq";
export const GROUP_BY = "GroupBy";
export const GT = "Gt";
export const INTEGER = "Integer";
export const NUMBER = "Number";
export const IS_NOT_NULL = "IsNotNull";
export const IS_NULL = "IsNull";
export const LEQ = "Leq";
export const LT = "Lt";
export const MEMBERSHIP = "Membership";
export const NAME = "Name";
export const NEQ = "Neq";
export const IN = "In";
export const NOTINCLUDES = "NotIncludes";
export const OR = "Or";
export const ORDER_BY = "OrderBy";
export const SPGROUP = "SPGroup";
export const SPWEB_ALL_USERS = "SPWeb.AllUsers";
export const SPWEB_GROUPS = "SPWeb.Groups";
export const SPWEB_USERS = "SPWeb.Users";
export const TEXT = "Text";
export const TYPE = "Type";
export const VALUE = "Value";
export const VIEW_FIELDS = "ViewFields";
export const WHERE = "Where";
export const _XML = "XML";
export const QUERY = "Query";
export const VIEW = "View";
export const LOOPUP_ID = "LookupId";

//Tipos de valores
export const VALUE_TYPE_TAXONOMY_FIELD_TYPE = "TaxonomyFieldType";
export const VALUE_TYPE_TAXONOMY_FIELD_TYPE_MULTI = "TaxonomyFieldTypeMulti";
export const VALUE_TYPE_COMPUTED = "Computed";
export const VALUE_TYPE_NUMBER = "Number";

/// <summary>
/// Enumeración para especificar la ordenación de los elementos del campo.
/// </summary>
export enum SortType {
    /// <summary>
    /// Ordenación ascendente
    /// </summary>
    Ascending,

    /// <summary>
    /// Ordenación descendente
    /// </summary>
    Descending
}

/// <summary>
/// Enumeración para especificar tipos de usuario.
/// </summary>
export enum MembershipType {
    /// <summary>
    /// Todos los usuarios de la web
    /// </summary>
    SPWebAllUsers,

    /// <summary>
    /// Un grupo
    /// </summary>
    SPGroup,

    /// <summary>
    /// Todos los grupos de la web
    /// </summary>
    SPWebGroups,

    /// <summary>
    /// Grupos del usuario actual
    /// </summary>
    CurrentUserGroups,

    /// <summary>
    /// Usuarios de la web
    /// </summary>
    SPWebUsers
}

/// <summary>
/// Tipo de operación
/// </summary>
export enum Operator {
    /// <summary>
    /// Unión
    /// </summary>
    AND,

    /// <summary>
    /// Disyunción
    /// </summary>
    OR
}

export class CamlHelper {

    public static ROW_LIMIT_1: number = 1;
    public static ROW_LIMIT_200: number = 200;
    public static ROW_LIMIT_2000: number = 2000;
    public static ROW_LIMIT_5000: number = 5000;

    public static RowLimitBy(n: number): string {
        return `<RowLimit>${n}</RowLimit>`;
    }

    /// <summary>
    /// Construye una cadena en XML con o sin atributos y valores.
    /// </summary>
    /// <param name="tag">TAG del elemento XML</param>
    /// <param name="attribute">Nombre del atributo (puede ser nulo)</param>
    /// <param name="attributeValue">Valor del atributo (puede ser nulo)</param>
    /// <param name="value">Valor del elemento (puede ser nulo)</param>
    /// <returns>Una cadena XML como resultado de la combinación de parámetros</returns>
    public static Tag(tag: string, attribute: string, attributeValue: string, value: string): string {
        if (IsEmptyOrNull(attribute) || IsEmptyOrNull(attributeValue)) {
            return IsEmptyOrNull(value) ?
                `<${tag}/>` :
                `<${tag}>${value}</${tag}>`;
        }
        else {
            return IsEmptyOrNull(value) ?
                `<${tag} ${attribute}="${attributeValue}" />` :
                `<${tag} ${attribute}="${attributeValue}">${value}</${tag}>`;
        }
    }

    /// <summary>
    /// Maneja un número arbitrario de pares de valores de atributos
    /// </summary>
    /// <param name="tag">TAG del elemento XML</param>
    /// <param name="value">Valor del elemento</param>
    /// <param name="attributeValuePairs">Un array de pares de valores de atributos que se incluirán en el tag correspondiente</param>
    /// <returns>Una cadena XML como resultado de la combinación de parámetros</returns>
    public static Tag2(tag: string, value: string, ...attributeValuePairs: any[]): string {

        var builder = [];

        builder.push("<" + tag);

        for (let i = 0; i < attributeValuePairs.length - 1; i += 2) {
            builder.push(` ${attributeValuePairs[i].ToString()}="${attributeValuePairs[i + 1].ToString()}"`);
        }

        if (IsEmptyOrNull(value))
            builder.push(" />");
        else
            builder.push(`>${value}</${tag}>`);

        return builder.join("");
    }

    /// <summary>
    /// Define la unión lógica de dos clausulas CAML.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la unión</param>
    /// <param name="rightPart">La parte derecha de la unión</param>
    /// <returns>Un nuevo elemento AND de CAML</returns>
    public static And(leftPart: string, rightPart: string): string { return this.Tag(AND, null, null, leftPart + rightPart); }

    /// <summary>
    /// Define que el valor del campo dado comienza con el valor especificado.
    /// </summary>
    /// <param name="fieldRefElement">Un elemento FieldRef de CAML</param>
    /// <param name="valueElement">Valor del elemento CAML</param>
    /// <returns>Un nuevo elemento BeginsWith de CAML</returns>
    public static BeginsWith(fieldRefElement: string, valueElement: string): string { return this.Tag(BEGINS_WITH, null, null, fieldRefElement + valueElement); }

    /// <summary>
    /// Define que el valor del campo dado contiene el valor especificado.
    /// </summary>
    /// <param name="fieldRefElement">Un elemento FieldRef de CAML</param>
    /// <param name="valueElement">Valor del elemento CAML</param>
    /// <returns>Un nuevo elenento Contains de CAML</returns>
    public static Contains(fieldRefElement: string, valueElement: string): string { return this.Tag(CONTAINS, null, null, fieldRefElement + valueElement); }

    /// <summary>
    /// Define que el valor del campo dado no contiene el valor especificado.
    /// </summary>
    /// <param name="fieldRefElement">Un elemento FieldRef de CAML</param>
    /// <param name="valueElement">Valor del elemento CAML</param>
    /// <returns>Un nuevo elenento NotIncludes de CAML</returns>
    public static NotIncludes(fieldRefElement: string, valueElement: string): string { return this.Tag(NOTINCLUDES, null, null, fieldRefElement + valueElement); }

    /// <summary>
    /// Comprueba si las fechas de un evento periódico se superponen a una determinada fecha.
    /// </summary>
    /// <param name="fieldRefElement">Un elemento FieldRef para la fecha del evento</param>
    /// <param name="valueElement">Valor del elemento CAML que contiene la fecha a comprobar</param>
    /// <returns>Un nuevo elemento DateRangesOverlap de CAML</returns>
    public static DateRangesOverlap(fieldRefElement: string, valueElement: string): string { return this.Tag(DATE_RANGES_OVERLAP, null, null, fieldRefElement + this.FieldRef("EndDate") + this.FieldRef("RecurrenceID") + valueElement); }

    /// <summary>
    /// Comprueba la igualdad de dos cláusulas CAML.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento EQ de CAML</returns>
    public static Eq(leftPart: string, rightPart: string): string { return this.Tag(EQ, null, null, leftPart + rightPart); }

    /// <summary>
    /// Identifica un campo CAML a través de una referencia.
    /// </summary>
    /// <param name="fieldName">El nombre del campo referenciado</param>
    /// <returns>Un nuevo elemento FieldRef de CAML</returns>
    public static FieldRef(fieldName: string): string { return this.Tag(FIELD_REF, NAME, this.SafeIdentifier(fieldName), null); }

    /// <summary>
    /// Identifica un campo CAML a través de una referencia.
    /// </summary>
    /// <param name="fieldName">El nombre del campo referenciado</param>
    /// <param name="isLookupId">La búsqueda del campo será por lookup (Uso en columnas de lookup o metadatos administrados)</param>
    /// <returns></returns>
    public static FieldRefLookup(fieldName: string, isLookupId: boolean): string {
        let query = `<FieldRef Name="${this.SafeIdentifier(fieldName)}" LookupId="${isLookupId ? 'TRUE' : 'FALSE'}" />`
        return query;
    }

    /// <summary>
    /// Identifica un campo en CAML y especifica su ordenación.
    /// </summary>
    /// <param name="fieldName">Nombre del campo referenciado</param>
    /// <param name="sortType">indicates how the resulting field instances shall be sorted</param>
    /// <returns>Un nuevo elemento FieldRef de CAML con ordenación</returns>
    public static FieldRefSort(fieldName: string, sortType: SortType): string { return this.Tag2(FIELD_REF, null, "Ascending", sortType == SortType.Ascending ? "TRUE" : "FALSE", NAME, this.SafeIdentifier(fieldName)); }

    /// <summary>
    /// Identifica cuando la parte izquierda de la expresión es mayor o igual que la de la derecha.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento GEQ de CAML</returns>
    public static Geq(leftPart: string, rightPart: string): string { return this.Tag(GEQ, null, null, leftPart + rightPart); }

    /// <summary>
    /// Identifica un campo referenciado por agrupación.
    /// </summary>
    /// <param name="fieldRefElement">Un campo FieldRef de CAML</param>
    /// <returns>Una nuevo elemento GroupBy de CAML</returns>
    public static GroupBy(fieldRefElement: string): string { return this.GroupByCollapse(fieldRefElement, false); }

    /// <summary>
    /// Identifica un campo referenciado por agrupación y especifica si el grupo se puede contraer.
    /// </summary>
    /// <param name="fieldRefElement">Un campo FieldRef de CAML</param>
    /// <param name="bCollapse">TRUE para que la sección Agrupar por en la vista de lista se contraiga de forma predeterminada.</param>
    /// <returns>Un nuevo elemento GroupBy de CAML</returns>
    public static GroupByCollapse(fieldRefElement: string, bCollapse: boolean): string { return this.Tag(GROUP_BY, COLLAPSE, bCollapse ? "TRUE" : "FALSE", fieldRefElement); }

    /// <summary>
    /// Comprueba cuando la parte izquierda de la expresión es mayor que la de la derecha.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento GT de CAML</returns>
    public static Gt(leftPart: string, rightPart: string): string { return this.Tag(GT, null, null, leftPart + rightPart); }

    /// <summary>
    /// Determina cuando un campo dado contiene un valor no nulo.
    /// </summary>
    /// <param name="fieldRefElement">Un campo FieldRef de CAML</param>
    /// <returns>Un nuevo elemento IsNotNull de CAML</returns>
    public static IsNotNull(fieldRefElement: string): string { return this.Tag(IS_NOT_NULL, null, null, fieldRefElement); }

    /// <summary>
    /// Determina cuando un campo dado es nulo.
    /// </summary>
    /// <param name="fieldRefElement">Un campo FieldRef de CAML</param>
    /// <returns>Un nuevo elemento IsNull de CAML</returns>
    public static IsNull(fieldRefElement: string): string { return this.Tag(IS_NULL, null, null, fieldRefElement); }

    /// <summary>
    /// Comprueba cuando la parte izquierda de la expresión es menor o igual que la de la derecha.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento LEQ de CAML</returns>
    public static Leq(leftPart: string, rightPart: string): string { return this.Tag(LEQ, null, null, leftPart + rightPart); }

    /// <summary>
    /// Comprueba cuando la parte izquierda de la expresión es menor que la de la derecha.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento LT de CAML</returns>
    public static Lt(leftPart: string, rightPart: string): string { return this.Tag(LT, null, null, leftPart + rightPart); }

    /// <summary>
    /// Especifica la agrupación de una consulta <see cref="CAML.MembershipType"/>.
    /// </summary>
    /// <param name="type">Especifica el tipo de agrupación</param>
    /// <returns>Un nuevo elemento Membership de CAML</returns>
    public static Membership(type: MembershipType): string { return this.MembershipType(type, null); }

    /// <summary>
    /// Especifica la agrupación de una consulta <see cref="CAML.MembershipType"/>
    /// </summary>
    /// <param name="type">Especifica el tipo de agrupación</param>
    /// <param name="value">Especifica el valor del filtro de agrupación</param>
    /// <returns>Un nuevo elemento Membership de CAML</returns>
    public static MembershipType(type: MembershipType, value: any): string {
        switch (type) {
            case MembershipType.SPWebAllUsers:
                return this.Tag(MEMBERSHIP, TYPE, SPWEB_ALL_USERS, value);
            case MembershipType.SPWebGroups:
                return this.Tag(MEMBERSHIP, TYPE, SPWEB_GROUPS, value);
            case MembershipType.SPWebUsers:
                return this.Tag(MEMBERSHIP, TYPE, SPWEB_USERS, value);
            case MembershipType.CurrentUserGroups:
                return this.Tag(MEMBERSHIP, TYPE, CURRENT_USER_GROUPS, value);
            case MembershipType.SPGroup:
                return this.Tag(MEMBERSHIP, TYPE, SPGROUP, value);
        }
    }

    /// <summary>
    /// Comprueba cuando la parte izquierda de la expresión no es igual que la de la derecha.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento NEQ de CAML</returns>
    public static Neq(leftPart: string, rightPart: string): string { return this.Tag(NEQ, null, null, leftPart + rightPart); }

    public static In(leftPart: string, rightPart: string): string { return this.Tag(IN, null, null, leftPart + rightPart); }

    /// <summary>
    /// Crea un elemento OR de CAML con el contenigo obtenido por parámtro.
    /// </summary>
    /// <param name="leftPart">La parte izquierda de la expresión</param>
    /// <param name="rightPart">La parte derecha de la expresión</param>
    /// <returns>Un nuevo elemento OR de CAML</returns>
    public static Or(leftPart: string, rightPart: string): string { return this.Tag(OR, null, null, leftPart + rightPart); }

    /// <summary>
    /// Especifica los nombres de los campos que serán usador para ordenar el resultado de la consulta.
    /// </summary>
    /// <param name="fieldRefElements">Una cadena en CAML que contiene una lista de elementos FieldRef</param>
    /// <returns>Un nuevo elemento OrderBy de CAML</returns>
    public static OrderBy(fieldRefElements: string): string { return this.Tag(ORDER_BY, null, null, fieldRefElements); }

    /// <summary>
    /// Construye un elemento 'OrderBy' a partir de un array de elementos FieldRef.
    /// </summary>
    /// <param name="args">Un array que contiene elementos FieldRef de CAML</param>
    /// <returns>Un nuevo elemento OrderBy de CAML</returns>
    public static OrderByFields(args: any[]): string {
        let fieldRefElements: string = "";
        args.forEach((item) => {
            fieldRefElements += item.ToString();
        });
        return this.Tag(ORDER_BY, null, null, fieldRefElements);
    }

    /// <summary>
    /// Especifica un valor de cadena de caracteres
    /// </summary>
    /// <param name="fieldValue">El valor de cadena de caracteres para ser expresado en CAML</param>
    /// <returns>Un nuevo elemento Value de CAML</returns>
    public static Value(fieldValue: string): string { return this.Tag(VALUE, TYPE, TEXT, fieldValue); }

    /// <summary>
    /// Especifica un valor entero
    /// </summary>
    /// <param name="fieldValue">el valor del entero para ser expresado en CAML</param>
    /// <returns>Un nuevo elemento Value de CAML</returns>
    // public static ValueNumber(fieldValue: number): string { return this.Tag(VALUE, TYPE, INTEGER, fieldValue.toString()); }
    public static ValueNumber(fieldValue: number): string { return this.Tag(VALUE, TYPE, NUMBER, fieldValue.toString()); }

    /// <summary>
    /// Especifica un valor de fecha
    /// </summary>
    /// <param name="fieldValue">El valor de la fecha para ser expresado en CAML</param>
    /// <returns>Un nuevo elemento Value de CAML</returns>
    public static ValueDate(fieldValue: Date): string { return this.Tag(VALUE, TYPE, DATETIME, fieldValue.toString()); }

    /// <summary>
    /// Especifica un valor booleano
    /// </summary>
    /// <param name="fieldValue">El valor booleano para ser expresado en CAML</param>
    /// <returns>Un nuevo elemento Value de CAML</returns>
    public static ValueBoolean(fieldValue: string): string { return this.Tag(VALUE, TYPE, BOOLEAN, fieldValue); }

    /// <summary>
    /// Especifica el valor de un tipo dado
    /// </summary>
    /// <param name="valueType">Una cadena de caracteres que describe el tipo de datos</param>
    /// <param name="fieldValue">El valor formateado como una cadena</param>
    /// <returns>Un nuevo elemento Value de CAML</returns>
    public static ValueType(valueType: string, fieldValue: string): string { return this.Tag(VALUE, TYPE, valueType, fieldValue); }

    /// <summary>
    /// Especifica que campos se incluyen en el resultado de la consulta.
    /// </summary>
    /// <param name="fields">Un Array de elementos FieldRef que identifican los campos a incluir</param>
    /// <returns>Un nuevo elemento ViewFields de CAML</returns>
    public static ViewFields(fields: string[]): string {
        let fieldRefElements: string = "";
        fields.forEach((item: string) => {
            fieldRefElements += item;
        });
        return this.Tag(VIEW_FIELDS, null, null, fieldRefElements);
    }

    /// <summary>
    /// Especifica la parte WHERE de una consulta.
    /// </summary>
    /// <param name="s">Una expresión en CAML que expresa las condicines WHERE</param>
    /// <returns>Un nuevo elemento Where de CAML</returns>
    public static Where(s: string): string { return this.Tag(WHERE, null, null, s); }

    /// <summary>
    /// Especifica la parte WHERE de una consulta.
    /// </summary>
    /// <param name="s">Una expresión en CAML que expresa las condicines WHERE</param>
    /// <returns>Un nuevo elemento Where de CAML</returns>
    public static Query(s: string): string { return this.Tag(QUERY, null, null, s); }

    /// <summary>
    /// Especifica la parte WHERE de una consulta.
    /// </summary>
    /// <param name="s">Una expresión en CAML que expresa las condicines WHERE</param>
    /// <returns>Un nuevo elemento Where de CAML</returns>
    public static View(s: string): string { return this.Tag(VIEW, null, null, s); }

    /// <summary>
    /// Especifica un elemento XML.
    /// </summary>
    /// <param name="s">Una expresión en CAML que irá embebida en el elemento</param>
    /// <returns>Un nuevo elemento XML de CAML</returns>
    public static XML(s: string): string { return this.Tag(_XML, null, null, s); }

    /// <summary>
    /// Crea un identificador "seguro" para usarlo en expresiones CAML.
    /// </summary>
    /// <remarks>
    /// Este método reemplaza los espacios en blanco por el token "_x0020_".
    /// </remarks>
    /// <param name="identifier">El identificador al cual aplicar el Token</param>
    /// <returns>Identificador al que se le ha aplicado el Token</returns>
    public static SafeIdentifier(identifier: string): string { return identifier.replace(" ", "_x0020_"); }
}